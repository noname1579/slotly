// app/admin/services/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  Scissors, 
  Clock, 
  Coins,
  X,
  Check
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  popular: boolean;
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    category: '',
    popular: false,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      toast.error('Ошибка загрузки услуг');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      duration: parseInt(formData.duration) || 0,
      price: parseInt(formData.price) || 0,
      popular: formData.popular,
    };

    try {
      const res = await fetch('/api/admin/services', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { id: editing.id, ...data } : data),
      });

      if (res.ok) {
        toast.success(editing ? 'Услуга обновлена' : 'Услуга добавлена');
        setShowModal(false);
        setEditing(null);
        setFormData({ name: '', duration: '', price: '', category: '', popular: false });
        loadServices();
      } else {
        toast.error('Ошибка сохранения');
      }
    } catch (error) {
      toast.error('Ошибка сохранения');
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Удалить услугу?')) return;
    try {
      const res = await fetch('/api/admin/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success('Услуга удалена');
        loadServices();
      }
    } catch (error) {
      toast.error('Ошибка удаления');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">💇 Услуги</h1>
        <button
          onClick={() => {
            setEditing(null);
            setFormData({ name: '', duration: '', price: '', category: '', popular: false });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить услугу
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {services.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Scissors className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Услуг пока нет</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Название</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Категория</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Длительность</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Цена</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Популярно</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{service.name}</td>
                    <td className="px-4 py-3 text-gray-600">{service.category || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {service.duration} мин
                    </td>
                    <td className="px-4 py-3 font-semibold text-purple-600">{service.price} ₽</td>
                    <td className="px-4 py-3">
                      {service.popular ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">Популярно</span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditing(service);
                            setFormData({
                              name: service.name,
                              duration: String(service.duration),
                              price: String(service.price),
                              category: service.category || '',
                              popular: service.popular,
                            });
                            setShowModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Модалка */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editing ? 'Редактировать услугу' : 'Добавить услугу'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  placeholder="Женская стрижка"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  placeholder="Стрижки"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Длительность (мин) *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    placeholder="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    placeholder="2500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="popular" className="text-sm font-medium text-gray-700">
                  Отметить как популярное
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  {editing ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}