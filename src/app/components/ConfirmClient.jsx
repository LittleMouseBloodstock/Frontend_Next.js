"use client"; // ✅ クライアントコンポーネント指定

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

export default function ConfirmClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch customer");
        }
        const data = await res.json();
        setCustomerInfo(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!id) {
    return <div className="alert alert-error">IDが指定されていません</div>;
  }

  if (error) {
    return <div className="alert alert-error">エラー: {error}</div>;
  }

  if (!customerInfo) {
    return <div className="alert alert-info">読み込み中...</div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo} />
      </div>
      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
