import LegalPage from '../components/LegalPage';

export default function RefundPolicy() {
  return (
    <LegalPage title="Refund Policy" meta="Legal">
      <p>
        Because all products sold on Creatively Lensed Store are <strong>digital downloads</strong> delivered
        instantly upon purchase, we generally cannot offer refunds once the download link has been
        accessed.
      </p>

      <h2>Exceptions</h2>
      <p>We will consider a refund or replacement in the following cases:</p>
      <ul>
        <li><strong>Corrupted file:</strong> If the downloaded file is damaged or unopenable, we will provide a replacement download or a full refund.</li>
        <li><strong>Duplicate purchase:</strong> If you accidentally purchased the same wallpaper twice, we will refund the duplicate.</li>
        <li><strong>Download failure:</strong> If you never received a working download link after payment, we will re-issue the link or refund your purchase.</li>
      </ul>

      <h2>How to Request</h2>
      <p>
        Email <a href="mailto:hello@creativelylensed.com">hello@creativelylensed.com</a> with your
        order number and a description of the issue. We aim to respond within 48 hours.
      </p>
    </LegalPage>
  );
}
