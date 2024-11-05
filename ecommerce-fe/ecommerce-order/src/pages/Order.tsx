import { useEffect, useState } from "react";
import { OrderService } from "../services/orderService";
import { OrderState } from "../store/slices/orderSlice";
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n/config";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderState[]>([]);
  const orderService = new OrderService();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderService.getAllOrders();
      setOrders(response?.data);
    };
    fetchOrders();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 order-container">
      <h1 className="text-2xl font-bold mb-8" data-testid="order-history-title">
        {t("ORDER.ORDER_HISTORY")}
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium" data-testid="order-date">
                      {t("ORDER.ORDER_DATE")}:
                    </span>{" "}
                    {new Date(order.createdAt).toLocaleDateString(i18n.language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium" data-testid="tracking-number">
                      {t("ORDER.TRACKING_NUMBER")}:
                    </span>{" "}
                    <span className="font-mono">{order.trackingNumber}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="p-4 hover:bg-gray-50 transition-colors"
                  data-testid="order-product"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>
                            {t("ORDER.QUANTITY")}:{" "}
                            <span className="font-medium text-gray-900">{item.quantity}</span>
                          </span>
                          <span className="hidden sm:inline text-gray-300">|</span>
                          <span data-testid="order-price">
                            {t("ORDER.PRICE")}:{" "}
                            <span className="font-medium text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">
                        ${item.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4">
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-600" data-testid="order-total-amount">
                    {t("ORDER.TOTAL_AMOUNT")}
                  </p>
                  <p className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-medium text-gray-900" data-testid="no-orders-found">
              {t("ORDER.NO_ORDERS_FOUND")}
            </h3>
            <p className="mt-1 text-sm text-gray-500" data-testid="no-orders-yet">
              {t("ORDER.NO_ORDERS_YET")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
