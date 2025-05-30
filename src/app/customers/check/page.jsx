// ✅ クライアントコンポーネントから searchParams を扱うようにするため分離
// ファイル構成: 
//   - app/customers/create/confirm/page.jsx （サーバーコンポーネント）
//   - components/ConfirmClient.jsx （クライアントコンポーネント）

// ---------- app/customers/create/confirm/page.jsx ----------
import ConfirmClient from "@/app/components/ConfirmClient";

export default function ReadPage() {
  return <ConfirmClient />;
}