import { useState, useEffect } from 'react'
import { MapPin, Plus, Search, Star, TrendingUp, Users, Euro, Target, Brain, Map } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const Neighborhoods = () => {
  const [neighborhoods, setNeighborhoods] = useState([])
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)

  // Données simulées
  const mockNeighborhoods = [
    {
      id: 1,
      name: 'Toulouse Sud',
      city: 'Toulouse',
      postal_code: '31400',
      latitude: 43.5804,
      longitude: 1.4481,
      rotation_rate_score: 8.5,
      potential_score: 9.2,
      demand_indicator: 8.8,
      average_age: 35,
      average_income: 45000,
      population: 25000,
      average_price_m2: 3200,
      average_sale_time: 45
    },
    {
      id: 2,
      name: 'Les Minimes',
      city: 'Toulouse',
      postal_code: '31200',
      latitude: 43.6108,
      longitude: 1.4442,
      rotation_rate_score: 7.2,
      potential_score: 7.8,
      demand_indicator: 7.5,
      average_age: 42,
      average_income: 52000,
      population: 18000,
      average_price_m2: 3800,
      average_sale_time: 52
    },
    {
      id: 3,
      name: 'Capitole',
      city: 'Toulouse',
      postal_code: '31000',
      latitude: 43.6047,
      longitude: 1.4442,
      rotation_rate_score: 6.8,
      potential_score: 7.1,
      demand_indicator: 8.2,
      average_age: 28,
      average_income: 38000,
      population: 12000,
      average_price_m2: 4500,
      average_sale_time: 38
    },
    {
      id: 4,
      name: 'Rangueil',
      city: 'Toulouse',
      postal_code: '31400',
      latitude: 43.5615,
      longitude: 1.4647,
      rotation_rate_score: 5.4,
      potential_score: 6.2,
      demand_indicator: 6.8,
      average_age: 31,
      average_income: 41000,
      population: 22000,
      average_price_m2: 3100,
      average_sale_time: 65
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setNeighborhoods(mockNeighborhoods)
      setFilteredNeighborhoods(mockNeighborhoods)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = neighborhoods

    if (searchTerm) {
      filtered = filtered.filter(neighborhood =>
        neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        neighborhood.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        neighborhood.postal_code.includes(searchTerm)
      )
    }

    setFilteredNeighborhoods(filtered)
  }, [searchTerm, neighborhoods])

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-700'
    if (score >= 6) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatIncome = (income) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(income)
  }

  const generateAIAnalysis = (neighborhood) => {
    const analyses = [
      {
        title: 'Profil Acquéreurs Cibles',
        content: 'Jeunes couples actifs (28-35 ans) avec revenus 45-65k€. Recherchent appartements 2-3 pièces avec balcon.',
        icon: Users,
        color: 'text-blue-600'
      },
      {
        title: 'Tendances du Marché',
        content: 'Hausse des prix de +8% sur 12 mois. Forte demande pour les biens avec extérieur.',
        icon: TrendingUp,
        color: 'text-green-600'
      },
      {
        title: 'Recommandations Farming',
        content: 'Organiser des portes ouvertes le weekend. Cibler les propriétaires de maisons individuelles.',
        icon: Target,
        color: 'text-purple-600'
      }
    ]
    return analyses
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des quartiers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analyse des Quartiers</h1>
          <p className="text-gray-600 mt-1">Optimisez votre stratégie de farming avec l'IA prédictive</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Map className="h-4 w-4 mr-2" />
            Vue Cartographique
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Brain className="h-4 w-4 mr-2" />
            Nouvelle Analyse IA
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{neighborhoods.length}</div>
            <p className="text-sm text-gray-600">Quartiers analysés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {neighborhoods.filter(n => n.potential_score >= 8).length}
            </div>
            <p className="text-sm text-gray-600">Potentiel élevé</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(neighborhoods.reduce((sum, n) => sum + n.average_price_m2, 0) / neighborhoods.length)}€
            </div>
            <p className="text-sm text-gray-600">Prix moyen/m²</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(neighborhoods.reduce((sum, n) => sum + n.average_sale_time, 0) / neighborhoods.length)}j
            </div>
            <p className="text-sm text-gray-600">Délai vente moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtre de recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un quartier par nom, ville ou code postal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des quartiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNeighborhoods.map((neighborhood) => (
          <Card key={neighborhood.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>{neighborhood.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {neighborhood.city} - {neighborhood.postal_code}
                  </CardDescription>
                </div>
                <Badge className={getScoreBadge(neighborhood.potential_score)}>
                  Score: {neighborhood.potential_score}/10
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Scores principaux */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(neighborhood.rotation_rate_score)}`}>
                      {neighborhood.rotation_rate_score}/10
                    </div>
                    <p className="text-xs text-gray-600">Taux Rotation</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(neighborhood.potential_score)}`}>
                      {neighborhood.potential_score}/10
                    </div>
                    <p className="text-xs text-gray-600">Potentiel</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getScoreColor(neighborhood.demand_indicator)}`}>
                      {neighborhood.demand_indicator}/10
                    </div>
                    <p className="text-xs text-gray-600">Demande</p>
                  </div>
                </div>

                {/* Barres de progression */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Potentiel de Farming</span>
                      <span>{neighborhood.potential_score}/10</span>
                    </div>
                    <Progress value={neighborhood.potential_score * 10} className="h-2" />
                  </div>
                </div>

                {/* Informations démographiques */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Population:</span>
                    <span className="text-gray-600 ml-1">
                      {neighborhood.population?.toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Âge moyen:</span>
                    <span className="text-gray-600 ml-1">{neighborhood.average_age} ans</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Revenu moyen:</span>
                    <span className="text-gray-600 ml-1">
                      {formatIncome(neighborhood.average_income)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Prix/m²:</span>
                    <span className="text-gray-600 ml-1">
                      {neighborhood.average_price_m2} €
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    Délai vente: {neighborhood.average_sale_time} jours
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedNeighborhood(neighborhood)}
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      Analyse IA
                    </Button>
                    <Button variant="outline" size="sm">
                      <Map className="h-3 w-3 mr-1" />
                      Voir Carte
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal d'analyse IA */}
      {selectedNeighborhood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>Analyse IA - {selectedNeighborhood.name}</span>
                  </CardTitle>
                  <CardDescription>
                    Insights générés par l'intelligence artificielle
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedNeighborhood(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Scores détaillés */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(selectedNeighborhood.potential_score)}`}>
                      {selectedNeighborhood.potential_score}/10
                    </div>
                    <p className="text-sm text-gray-600">Score de Potentiel</p>
                    <p className="text-xs text-gray-500 mt-1">Confiance: 89%</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      +{Math.round(selectedNeighborhood.potential_score * 1.2)}%
                    </div>
                    <p className="text-sm text-gray-600">Évolution prévue</p>
                    <p className="text-xs text-gray-500 mt-1">6 prochains mois</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(selectedNeighborhood.rotation_rate_score * 2)}
                    </div>
                    <p className="text-sm text-gray-600">Ventes prévues</p>
                    <p className="text-xs text-gray-500 mt-1">Par trimestre</p>
                  </div>
                </div>

                {/* Analyses IA */}
                <div className="space-y-4">
                  {generateAIAnalysis(selectedNeighborhood).map((analysis, index) => {
                    const Icon = analysis.icon
                    return (
                      <div key={index} className="flex space-x-3 p-4 bg-white border rounded-lg">
                        <div className={`p-2 rounded-full bg-gray-100 ${analysis.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{analysis.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{analysis.content}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline">
                    Générer Rapport Complet
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Démarrer Campagne Farming
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredNeighborhoods.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun quartier trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Aucun quartier ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Réinitialiser la recherche
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Neighborhoods

