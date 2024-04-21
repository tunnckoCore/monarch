export async function GET({ params }) {
  const [id, image] = params.id.split('-');
  const url = `https://api.ethscriptions.com/api/ethscriptions/${image === '0' ? 0 : id}/data`;

  return fetch(url);
}
