import { useState, useEffect } from 'react'
import { FileText, Plus, Search, Download, Eye, Calendar, MapPin, TrendingUp, Users, Sparkles, Brain } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showGenerator, setShowGenerator] = useState(false)
  const [generatorData, setGeneratorData] = useState({
    type: 'analyse_marche',
    location: '',
    subject: '',
    keywords: ''
  })

  // Données simulées
  const mockReports = [
    {
      id: 1,
      title: 'Rapport de Marché - Toulouse Sud',
      report_type: 'analyse_marche',
      location: 'Toulouse Sud',
      status: 'completed',
      user_id: 1,
      created_at: '2024-03-20T10:30:00Z',
      file_path: '/reports/marche_toulouse_sud.pdf'
    },
    {
      id: 2,
      title: 'Prédictions IA - Quartier Minimes',
      report_type: 'prediction_quartier',
      location: 'Les Minimes',
      status: 'completed',
      user_id: 1,
      created_at: '2024-03-18T14:15:00Z',
      file_path: '/reports/prediction_minimes.pdf'
    },
    {
      id: 3,
      title: 'Profils Acquéreurs - Rangueil',
      report_type: 'profil_acquereurs',
      location: 'Rangueil',
      status: 'generating',
      user_id: 1,
      created_at: '2024-03-22T09:45:00Z',
      file_path: null
    },
    {
      id: 4,
      title: 'Analyse Complète - Centre Toulouse',
      report_type: 'analyse_marche',
      location: 'Centre-ville',
      status: 'completed',
      user_id: 1,
      created_at: '2024-03-15T16:20:00Z',
      file_path: '/reports/analyse_centre.pdf'
    }
  ]

  // Suggestions de contenu simulées
  const [contentSuggestions, setContentSuggestions] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports)
      setFilteredReports(mockReports)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = reports

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(report => report.report_type === selectedType)
    }

    setFilteredReports(filtered)
  }, [searchTerm, selectedType, reports])

  const reportTypes = [
    { value: 'all', label: 'Tous les types', icon: FileText },
    { value: 'analyse_marche', label: 'Analyse de Marché', icon: TrendingUp },
    { value: 'prediction_quartier', label: 'Prédiction Quartier', icon: Brain },
    { value: 'profil_acquereurs', label: 'Profils Acquéreurs', icon: Users }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      generating: { label: 'En cours', className: 'bg-yellow-100 text-yellow-700' },
      completed: { label: 'Terminé', className: 'bg-green-100 text-green-700' },
      error: { label: 'Erreur', className: 'bg-red-100 text-red-700' }
    }

    const config = statusConfig[status] || statusConfig.generating
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateContentSuggestions = async () => {
    // Simulation d'appel API pour l'assistant de rédaction
    const mockSuggestions = [
      {
        type: 'post_linkedin',
        content: '🏡 Découvrez les opportunités exceptionnelles du quartier ' + generatorData.location + ' ! Notre analyse IA révèle un potentiel de croissance de +12% sur les 6 prochains mois. #ImmobilierToulouse #InvestissementImmobilier'
      },
      {
        type: 'post_facebook',
        content: '🌟 Vous cherchez à investir dans l\'immobilier à ' + generatorData.location + ' ? Notre dernière étude montre des tendances très prometteuses ! Contactez-moi pour en savoir plus.'
      },
      {
        type: 'annonce',
        content: 'Magnifique opportunité d\'investissement dans le secteur prisé de ' + generatorData.location + '. Zone en pleine expansion avec un excellent potentiel de plus-value.'
      }
    ]

    setContentSuggestions(mockSuggestions)
  }

  const handleGenerateReport = () => {
    // Simulation de génération de rapport
    const newReport = {
      id: reports.length + 1,
      title: `${reportTypes.find(t => t.value === generatorData.type)?.label} - ${generatorData.location}`,
      report_type: generatorData.type,
      location: generatorData.location,
      status: 'generating',
      user_id: 1,
      created_at: new Date().toISOString(),
      file_path: null
    }

    setReports([newReport, ...reports])
    setShowGenerator(false)
    setGeneratorData({ type: 'analyse_marche', location: '', subject: '', keywords: '' })

    // Simuler la completion après 3 secondes
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'completed', file_path: `/reports/generated_${r.id}.pdf` }
          : r
      ))
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des rapports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rapports & Contenu</h1>
          <p className="text-gray-600 mt-1">Générez des analyses et du contenu marketing avec l'IA</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button 
            variant="outline"
            onClick={() => generateContentSuggestions()}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Assistant Rédaction
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowGenerator(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Rapport
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
            <p className="text-sm text-gray-600">Total rapports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'completed').length}
            </div>
            <p className="text-sm text-gray-600">Terminés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'generating').length}
            </div>
            <p className="text-sm text-gray-600">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {reports.filter(r => r.report_type === 'analyse_marche').length}
            </div>
            <p className="text-sm text-gray-600">Analyses marché</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par titre ou localisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {reportTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.value}
                    variant={selectedType === type.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type.value)}
                    className={selectedType === type.value ? 'bg-blue-600 hover:bg-blue-700' : ''}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {type.label}
                  </Button>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assistant de rédaction */}
      {contentSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>Suggestions de Contenu IA</span>
            </CardTitle>
            <CardDescription>
              Contenu généré automatiquement pour vos réseaux sociaux et annonces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentSuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {suggestion.type === 'post_linkedin' ? 'LinkedIn' : 
                       suggestion.type === 'post_facebook' ? 'Facebook' : 'Annonce'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Copier
                    </Button>
                  </div>
                  <p className="text-sm text-gray-700">{suggestion.content}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => setContentSuggestions([])}
            >
              Fermer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Liste des rapports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => {
          const typeConfig = reportTypes.find(t => t.value === report.report_type)
          const Icon = typeConfig?.icon || FileText

          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{report.location}</span>
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le {formatDate(report.created_at)}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Type:</span>
                    <span className="text-gray-600 ml-1">{typeConfig?.label}</span>
                  </div>

                  {report.status === 'generating' && (
                    <div className="flex items-center space-x-2 text-sm text-yellow-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                      <span>Génération en cours...</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <Badge variant="outline" className="text-xs">
                    {report.report_type.replace('_', ' ')}
                  </Badge>
                  <div className="space-x-2">
                    {report.status === 'completed' && (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Télécharger
                        </Button>
                      </>
                    )}
                    {report.status === 'generating' && (
                      <Button variant="outline" size="sm" disabled>
                        En cours...
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal de génération de rapport */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Générer un Nouveau Rapport</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowGenerator(false)}
                >
                  ✕
                </Button>
              </div>
              <CardDescription>
                Utilisez l'IA pour créer des analyses personnalisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Type de rapport</label>
                  <select 
                    className="w-full mt-1 p-2 border rounded-md"
                    value={generatorData.type}
                    onChange={(e) => setGeneratorData({...generatorData, type: e.target.value})}
                  >
                    <option value="analyse_marche">Analyse de Marché</option>
                    <option value="prediction_quartier">Prédiction Quartier</option>
                    <option value="profil_acquereurs">Profils Acquéreurs</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Localisation</label>
                  <Input
                    placeholder="Ex: Toulouse Sud, Les Minimes..."
                    value={generatorData.location}
                    onChange={(e) => setGeneratorData({...generatorData, location: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Sujet spécifique (optionnel)</label>
                  <Textarea
                    placeholder="Décrivez les aspects particuliers à analyser..."
                    value={generatorData.subject}
                    onChange={(e) => setGeneratorData({...generatorData, subject: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Mots-clés (optionnel)</label>
                  <Input
                    placeholder="Ex: investissement, famille, première acquisition..."
                    value={generatorData.keywords}
                    onChange={(e) => setGeneratorData({...generatorData, keywords: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowGenerator(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleGenerateReport}
                    disabled={!generatorData.location}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Générer avec IA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun rapport trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Aucun rapport ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedType('all')
            }}>
              Réinitialiser les filtres
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Reports

