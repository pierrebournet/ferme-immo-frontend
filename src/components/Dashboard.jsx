import { useState, useEffect } from 'react'
import { Building2, Users, MapPin, TrendingUp, Target, Star, ArrowUp, ArrowDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// Graphiques simplifiés sans recharts

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalLeads: 0,
    totalNeighborhoods: 0,
    conversionRate: 0
  })

  const [chartData] = useState([
    { mois: 'Jan', ventes: 12, prospects: 45 },
    { mois: 'Fév', ventes: 19, prospects: 52 },
    { mois: 'Mar', ventes: 15, prospects: 48 },
    { mois: 'Avr', ventes: 22, prospects: 61 },
    { mois: 'Mai', ventes: 28, prospects: 73 },
    { mois: 'Jun', ventes: 31, prospects: 68 }
  ])

  const [neighborhoodData] = useState([
    { nom: 'Toulouse Sud', score: 8.5, couleur: '#22c55e' },
    { nom: 'Minimes', score: 7.2, couleur: '#f59e0b' },
    { nom: 'Capitole', score: 6.8, couleur: '#f59e0b' },
    { nom: 'Rangueil', score: 5.4, couleur: '#ef4444' }
  ])

  const [recentActivities] = useState([
    { type: 'lead', message: 'Nouveau prospect: Marie Dupont', time: '5 min' },
    { type: 'property', message: 'Propriété ajoutée: Villa Toulouse Sud', time: '15 min' },
    { type: 'report', message: 'Rapport généré: Analyse Q2 2024', time: '1h' },
    { type: 'chatbot', message: '3 nouvelles conversations chatbot', time: '2h' }
  ])

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setStats({
        totalProperties: 156,
        totalLeads: 89,
        totalNeighborhoods: 12,
        conversionRate: 23.5
      })
    }, 500)
  }, [])

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, description }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {trend && (
          <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {trendValue}% par rapport au mois dernier
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité immobilière</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Target className="h-4 w-4 mr-2" />
            Nouvelle Analyse IA
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Propriétés"
          value={stats.totalProperties}
          icon={Building2}
          trend="up"
          trendValue="12"
          description="Biens dans votre portefeuille"
        />
        <StatCard
          title="Prospects"
          value={stats.totalLeads}
          icon={Users}
          trend="up"
          trendValue="8"
          description="Leads actifs en cours"
        />
        <StatCard
          title="Quartiers Analysés"
          value={stats.totalNeighborhoods}
          icon={MapPin}
          trend="up"
          trendValue="3"
          description="Zones de farming actives"
        />
        <StatCard
          title="Taux de Conversion"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          trend="up"
          trendValue="5"
          description="Prospects convertis en clients"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des ventes */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Ventes</CardTitle>
            <CardDescription>Ventes et prospects sur les 6 derniers mois</CardDescription>
          </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {chartData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{data.mois}</span>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Ventes: {data.ventes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Prospects: {data.prospects}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
        </Card>

        {/* Top quartiers */}
        <Card>
          <CardHeader>
            <CardTitle>Quartiers à Fort Potentiel</CardTitle>
            <CardDescription>Scores de farming basés sur l'IA prédictive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {neighborhoodData.map((quartier, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: quartier.couleur }}
                    />
                    <span className="font-medium text-gray-900">{quartier.nom}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-gray-900">{quartier.score}/10</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Voir Tous les Quartiers
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Activités Récentes</CardTitle>
          <CardDescription>Dernières actions sur votre plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'lead' ? 'bg-green-100 text-green-600' :
                  activity.type === 'property' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'report' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'lead' && <Users className="h-4 w-4" />}
                  {activity.type === 'property' && <Building2 className="h-4 w-4" />}
                  {activity.type === 'report' && <TrendingUp className="h-4 w-4" />}
                  {activity.type === 'chatbot' && <Users className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

