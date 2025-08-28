import { useState, useEffect } from 'react'
import { Users, Plus, Search, Star, Phone, Mail, Calendar, TrendingUp, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Leads = () => {
  const [leads, setLeads] = useState([])
  const [filteredLeads, setFilteredLeads] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Données simulées
  const mockLeads = [
    {
      id: 1,
      first_name: 'Marie',
      last_name: 'Dupont',
      email: 'marie.dupont@email.com',
      phone: '06 12 34 56 78',
      lead_type: 'buyer',
      budget_min: 250000,
      budget_max: 350000,
      property_type_interest: 'Appartement 3 pièces',
      location_interest: 'Toulouse Sud',
      score: 8.5,
      status: 'qualified',
      source: 'website',
      created_at: '2024-03-15T10:30:00Z',
      last_contact_date: '2024-03-20T14:15:00Z'
    },
    {
      id: 2,
      first_name: 'Jean',
      last_name: 'Martin',
      email: 'jean.martin@email.com',
      phone: '06 98 76 54 32',
      lead_type: 'seller',
      budget_min: null,
      budget_max: null,
      property_type_interest: 'Maison individuelle',
      location_interest: 'Minimes',
      score: 6.2,
      status: 'contacted',
      source: 'referral',
      created_at: '2024-03-10T09:15:00Z',
      last_contact_date: '2024-03-18T11:30:00Z'
    },
    {
      id: 3,
      first_name: 'Sophie',
      last_name: 'Bernard',
      email: 'sophie.bernard@email.com',
      phone: '06 45 67 89 01',
      lead_type: 'buyer',
      budget_min: 400000,
      budget_max: 600000,
      property_type_interest: 'Villa avec jardin',
      location_interest: 'Rangueil',
      score: 9.1,
      status: 'new',
      source: 'chatbot',
      created_at: '2024-03-22T16:45:00Z',
      last_contact_date: null
    },
    {
      id: 4,
      first_name: 'Pierre',
      last_name: 'Durand',
      email: 'pierre.durand@email.com',
      phone: '06 23 45 67 89',
      lead_type: 'buyer',
      budget_min: 180000,
      budget_max: 250000,
      property_type_interest: 'Studio ou T2',
      location_interest: 'Centre-ville',
      score: 4.8,
      status: 'lost',
      source: 'social_media',
      created_at: '2024-02-28T13:20:00Z',
      last_contact_date: '2024-03-05T10:00:00Z'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setLeads(mockLeads)
      setFilteredLeads(mockLeads)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = leads

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.location_interest.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === selectedStatus)
    }

    setFilteredLeads(filtered)
  }, [searchTerm, selectedStatus, leads])

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts', count: leads.length },
    { value: 'new', label: 'Nouveaux', count: leads.filter(l => l.status === 'new').length },
    { value: 'contacted', label: 'Contactés', count: leads.filter(l => l.status === 'contacted').length },
    { value: 'qualified', label: 'Qualifiés', count: leads.filter(l => l.status === 'qualified').length },
    { value: 'converted', label: 'Convertis', count: leads.filter(l => l.status === 'converted').length },
    { value: 'lost', label: 'Perdus', count: leads.filter(l => l.status === 'lost').length }
  ]

  const formatBudget = (min, max) => {
    if (!min && !max) return 'Non spécifié'
    if (!max) return `À partir de ${min.toLocaleString('fr-FR')} €`
    if (!min) return `Jusqu'à ${max.toLocaleString('fr-FR')} €`
    return `${min.toLocaleString('fr-FR')} - ${max.toLocaleString('fr-FR')} €`
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { label: 'Nouveau', className: 'bg-blue-100 text-blue-700' },
      contacted: { label: 'Contacté', className: 'bg-yellow-100 text-yellow-700' },
      qualified: { label: 'Qualifié', className: 'bg-green-100 text-green-700' },
      converted: { label: 'Converti', className: 'bg-purple-100 text-purple-700' },
      lost: { label: 'Perdu', className: 'bg-red-100 text-red-700' }
    }

    const config = statusConfig[status] || statusConfig.new
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getLeadTypeLabel = (type) => {
    return type === 'buyer' ? 'Acheteur' : 'Vendeur'
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des prospects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prospects</h1>
          <p className="text-gray-600 mt-1">Gérez vos leads et optimisez vos conversions</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Prospect
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
            <p className="text-sm text-gray-600">Total prospects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.score >= 7).length}
            </div>
            <p className="text-sm text-gray-600">Score élevé (≥7)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.lead_type === 'buyer').length}
            </div>
            <p className="text-sm text-gray-600">Acheteurs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {((leads.filter(l => l.status === 'converted').length / leads.length) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Taux conversion</p>
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
                  placeholder="Rechercher par nom, email ou localisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedStatus === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(option.value)}
                  className={selectedStatus === option.value ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {option.label} ({option.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des prospects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {lead.first_name} {lead.last_name}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getLeadTypeLabel(lead.lead_type)}
                    </Badge>
                    <span>•</span>
                    <span>{lead.location_interest}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                    <span className={`font-bold text-sm ${getScoreColor(lead.score)}`}>
                      {lead.score}/10
                    </span>
                  </div>
                  {getStatusBadge(lead.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{lead.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{lead.phone}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Intérêt:</span>
                  <span className="text-gray-600 ml-1">{lead.property_type_interest}</span>
                </div>
                {(lead.budget_min || lead.budget_max) && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Budget:</span>
                    <span className="text-gray-600 ml-1">
                      {formatBudget(lead.budget_min, lead.budget_max)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Créé le {formatDate(lead.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Dernier contact: {formatDate(lead.last_contact_date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <Badge variant="outline" className="text-xs">
                  Source: {lead.source}
                </Badge>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Contacter
                  </Button>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun prospect trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              Aucun prospect ne correspond à vos critères de recherche.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedStatus('all')
            }}>
              Réinitialiser les filtres
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Leads

