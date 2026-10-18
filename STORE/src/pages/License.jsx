import LegalPage from '../components/LegalPage';

export default function License() {
  return (
    <LegalPage title="License Agreement" meta="Legal">
      <h2>Personal Use License</h2>
      <p>
        By purchasing a digital wallpaper from Creatively Lensed Store, you are granted a
        <strong> non-exclusive, non-transferable, personal-use license</strong> to use the
        downloaded file(s) as wallpaper on your personal devices (phones, tablets, desktops, laptops).
      </p>

      <h3>You May</h3>
      <ul>
        <li>Use the wallpaper on any number of personal devices you own.</li>
        <li>Display the wallpaper in personal social media posts showing your device setup (credit appreciated but not required).</li>
      </ul>

      <h3>You May Not</h3>
      <ul>
        <li>Redistribute, resell, sublicense, or share the downloaded file(s) with any third party.</li>
        <li>Use the wallpaper in any commercial product, print, merchandise, or advertising without a separate commercial license.</li>
        <li>Claim the artwork as your own creation.</li>
        <li>Use the wallpaper in AI training datasets.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All artwork originates from original photography by Akshat Dange. The copyright remains
        with the creator at all times. Purchasing a wallpaper grants a license to <em>use</em> the
        file — it does not transfer ownership of the intellectual property.
      </p>

      <h2>Commercial Licensing</h2>
      <p>
        If you need to use a wallpaper commercially (prints, merchandise, brand assets, editorial),
        please contact <a href="mailto:hello@creativelylensed.com">hello@creativelylensed.com</a> for
        a custom commercial license quote.
      </p>
    </LegalPage>
  );
}
