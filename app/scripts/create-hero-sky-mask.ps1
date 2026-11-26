param(
  [string]$SourcePath = (Join-Path $PSScriptRoot '../src/assets/photography/architecture.jpg'),
  [string]$MaskPath = (Join-Path $PSScriptRoot '../src/assets/photography/sky-mask.png'),
  [string]$PreviewPath
)

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
public static class HeroSkyMask {
  private static double Luma(Color c) { return .2126 * c.R + .7152 * c.G + .0722 * c.B; }
  private static double FindEdge(Bitmap photo, int x, double expected) {
    int from = Math.Min(photo.Height - 9, (int)((expected + 45) * photo.Height / 1280));
    int to = Math.Max(9, (int)((expected - 45) * photo.Height / 1280));
    // Approach from the sky. The first sharp transition is the silhouette,
    // rather than a brighter reflection or a window grid inside the facade.
    for (int y = from; y >= to; y--) {
      double above = 0, below = 0;
      for (int d = 3; d <= 7; d += 2) {
        above += Luma(photo.GetPixel(x, y - d));
        below += Luma(photo.GetPixel(x, y + d));
      }
      if ((below - above) / 3 > 10 && below / 3 > 173) return y * 1280.0 / photo.Height + .3;
    }
    return expected;
  }
  public static void Create(string source, string target, string preview) {
    using (var photo = new Bitmap(source)) {
      int w = photo.Width, h = photo.Height, count = w * h;
      var eligible = new bool[count];
      var sky = new bool[count];
      var facadeEdge = new double[w];
      for (int x = 0; x < w; x++) {
        double sx = x * 1920.0 / w;
        double expected = sx <= 590 ? 292 - .297 * sx
          : sx < 670 ? (670 - sx) * 1.4625 + 2
          : sx < 1217 ? -100
          : sx < 1373 ? 110 + (sx - 1217) * 247 / 156
          : sx < 1689 ? 357 + (sx - 1373) * 245 / 316
          : sx < 1802 ? 602 + (sx - 1689) * 101 / 113 : 703;
        facadeEdge[x] = sx < 670 || expected < 0 ? expected : FindEdge(photo, x, expected);
      }
      for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
        Color c = photo.GetPixel(x, y);
        double luminance = .2126 * c.R + .7152 * c.G + .0722 * c.B;
        double sx = x * 1920.0 / w, sy = y * 1280.0 / h;
        // Glass reflects the sky's colors. Explicit facade bounds disambiguate
        // those connected reflections without shrinking the whole sky region.
        bool facade = sy < facadeEdge[x];
        facade |= sx > 1850 && sy > 1080;
        eligible[y * w + x] = !facade && luminance >= 173 && c.R >= 145 && c.G >= 160 && c.B >= 165 && c.B - c.R < 65;
      }
      // Only the bright region connected to the actual sky is admitted.
      // Isolated lit windows never enter the mask.
      var queue = new int[count];
      int head = 0, tail = 0, seed = (h / 12) * w + w / 2;
      if (!eligible[seed]) throw new InvalidOperationException("Sky seed is not eligible.");
      sky[seed] = true;
      queue[tail++] = seed;
      while (head < tail) {
        int p = queue[head++], x = p % w, y = p / w;
        int[] neighbors = { x > 0 ? p - 1 : -1, x < w - 1 ? p + 1 : -1, y > 0 ? p - w : -1, y < h - 1 ? p + w : -1 };
        foreach (int n in neighbors) if (n >= 0 && eligible[n] && !sky[n]) { sky[n] = true; queue[tail++] = n; }
      }
      // An inward distance feather cannot leak alpha onto building pixels.
      var distance = new float[count];
      for (int p = 0; p < count; p++) distance[p] = sky[p] ? 10000 : 0;
      for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
        int p = y * w + x;
        if (!sky[p]) continue;
        if (x > 0) distance[p] = Math.Min(distance[p], distance[p - 1] + 1);
        if (y > 0) distance[p] = Math.Min(distance[p], distance[p - w] + 1);
        if (x > 0 && y > 0) distance[p] = Math.Min(distance[p], distance[p - w - 1] + 1.4142f);
        if (x < w - 1 && y > 0) distance[p] = Math.Min(distance[p], distance[p - w + 1] + 1.4142f);
      }
      for (int y = h - 1; y >= 0; y--) for (int x = w - 1; x >= 0; x--) {
        int p = y * w + x;
        if (!sky[p]) continue;
        if (x < w - 1) distance[p] = Math.Min(distance[p], distance[p + 1] + 1);
        if (y < h - 1) distance[p] = Math.Min(distance[p], distance[p + w] + 1);
        if (x < w - 1 && y < h - 1) distance[p] = Math.Min(distance[p], distance[p + w + 1] + 1.4142f);
        if (x > 0 && y < h - 1) distance[p] = Math.Min(distance[p], distance[p + w - 1] + 1.4142f);
      }
      using (var mask = new Bitmap(w, h, PixelFormat.Format32bppArgb))
      using (var check = new Bitmap(w, h, PixelFormat.Format24bppRgb)) {
        for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
          int p = y * w + x;
          double t = sky[p] ? Math.Max(0, Math.Min(1, distance[p] / 2.5)) : 0;
          int alpha = (int)Math.Round(255 * t * t * (3 - 2 * t));
          mask.SetPixel(x, y, Color.FromArgb(alpha, 255, 255, 255));
          if (!String.IsNullOrEmpty(preview)) {
            Color c = photo.GetPixel(x, y);
            double blend = alpha / 255.0 * .65;
            check.SetPixel(x, y, Color.FromArgb((int)(c.R * (1 - blend)), (int)(c.G * (1 - blend) + 255 * blend), (int)(c.B * (1 - blend) + 180 * blend)));
          }
        }
        mask.Save(target, ImageFormat.Png);
        if (!String.IsNullOrEmpty(preview)) check.Save(preview, ImageFormat.Png);
      }
      Console.WriteLine("Sky coverage: {0:P1}; mask: {1}", tail / (double)count, target);
    }
  }
}
'@
[HeroSkyMask]::Create([IO.Path]::GetFullPath($SourcePath), [IO.Path]::GetFullPath($MaskPath), $PreviewPath)
