// app/admin/masters/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  RefreshCw, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Star, 
  Briefcase, 
  X,
  Check
} from 'lucide-react';

interface Master {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  createdAt: string;
}

export default function AdminMastersPage() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Master | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    rating: '',
    reviews: '',
    experience: '',
  });

  useEffect(() => {
    loadMasters();
  }, []);

  const loadMasters = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/masters');
      const data = await res.json();
      setMasters(data);
    } catch (error) {
      toast.error('Ошибка загрузки мастеров');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      experience: parseInt(formData.experience) || 0,
    };

    try {
      const res = await fetch('/api/admin/masters', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { id: editing.id, ...data } : data),
      });

      if (res.ok) {
        toast.success(editing ? 'Мастер обновлён' : 'Мастер добавлен');
        setShowModal(false);
        setEditing(null);
        setFormData({ name: '', specialty: '', rating: '', reviews: '', experience: '' });
        loadMasters();
      } else {
        toast.error('Ошибка сохранения');
      }
    } catch (error) {
      toast.error('Ошибка сохранения');
    }
  };

  const deleteMaster = async (id: string) => {
    if (!confirm('Удалить мастера?')) return;
    try {
      const res = await fetch('/api/admin/masters', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        toast.success('Мастер удалён');
        loadMasters();
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
        <h1 className="text-2xl font-bold text-gray-900">👨‍💼 Мастера</h1>
        <button
          onClick={() => {
            setEditing(null);
            setFormData({ name: '', specialty: '', rating: '', reviews: '', experience: '' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить мастера
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {masters.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Мастеров пока нет</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Имя</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Специализация</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Рейтинг</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Отзывы</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Опыт</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {masters.map((master) => (
                  <tr key={master.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{master.name}</td>
                    <td className="px-4 py-3 text-gray-600">{master.specialty}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {master.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{master.reviews}</td>
                    <td className="px-4 py-3 text-gray-600">{master.experience} лет</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditing(master);
                            setFormData({
                              name: master.name,
                              specialty: master.specialty,
                              rating: String(master.rating),
                              reviews: String(master.reviews),
                              experience: String(master.experience),
                            });
                            setShowModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMaster(master.id)}
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
                {editing ? 'Редактировать мастера' : 'Добавить мастера'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  placeholder="Анна Смирнова"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Специализация *</label>
                <input
                  type="text"
                  required
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                  placeholder="Парикмахер-стилист"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Рейтинг</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    placeholder="4.9"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отзывы</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    placeholder="127"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Опыт (лет)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                    placeholder="8"
                  />
                </div>
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