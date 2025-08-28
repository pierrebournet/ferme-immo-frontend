import { useState, useEffect } from 'react'
import { Building2, Plus, Search, Filter, MapPin, Euro, Home, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Données simulées
  const mockProperties = [
    {
      id: 1,
      address: '15 Rue de la République',
      city: 'Toulouse',
      postal_code: '31000',
      property_type: 'appartement',
      surface: 85,
      rooms: 3,
      price: 285000,
      sale_date: '2024-03-15',
      latitude: 43.6047,
      longitude: 1.4442
    },
    {
      id: 2,
      address: '42 Avenue Jean Jaurès',
      city: 'Toulouse',
      postal_code: '31000',
      property_type: 'maison',
      surface: 120,
      rooms: 5,
      price: 450000,
      sale_date: '2024-02-28',
      latitude: 43.6108,
      longitude: 1.4442
    },
    {
      id: 3,
      address: '8 Impasse des Fleurs',
      city: 'Toulouse',
      postal_code: '31400',
      property_type: 'villa',
      surface: 180,
      rooms: 6,
      price: 650000,
      sale_date: null,
      latitude: 43.5804,
      longitude: 1.4481
    },
    {
      id: 4,
      address: '23 Boulevard de Strasbourg',
      city: 'Toulouse',
      postal_code: '31000',
      property_type: 'appartement',
      surface: 65,
      rooms: 2,
      price: 220000,
      sale_date: '2024-01-10',
      latitude: 43.6108,
      longitude: 1.4442
    }
  ]

  useEffect(() => {
    // Simulation de chargement des données
    setTimeout(() => {
      setProperties(mockProperties)
      setFilteredProperties(mockProperties)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = properties

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.postal_code.includes(searchTerm)
      )
    }

    // Filtrer par type
    if (selectedType !== 'all') {
      filtered = filtered.filter(property => property.property_type === selectedType)
    }

    setFilteredProperties(filtered)
  }, [searchTerm, selectedType, properties])

  const propertyTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'appartement', label: 'Appartements' },
    { value: 'maison', label: 'Maisons' },
    { value: 'villa', label: 'Villas' }
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Non vendu'
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'appartement':
        return <Building2 className="h-4 w-4" />
      case 'maison':
      case 'villa':
        return <Home className="h-4 w-4" />
      default:
        return <Building2 className="h-4 w-4" />
    }
  }

  const getStatusBadge = (saleDate) => {
    if (saleDate) {
      return <Badge variant="secondary" className="bg-green-100 text-green-700">Vendu</Badge>
    }
    return <Badge variant="outline" className="border-blue-500 text-blue-700">Disponible</Badge>
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des propriétés...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Propriétés</h1>
          <p className="text-gray-600 mt-1">Gérez votre portefeuille immobilier</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une Propriété
        </Button>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par adresse, ville ou code postal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {propertyTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                  className={selectedType === type.value ? 'bg-blue-600 hover:bg-blue-700' : ''}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
            <p className="text-sm text-gray-600">Total propriétés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {properties.filter(p => p.sale_date).length}
            </div>
            <p className="text-sm text-gray-600">Vendues</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {properties.filter(p => !p.sale_date).length}
            </div>
            <p className="text-sm text-gray-600">Disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(properties.reduce((sum, p) => sum + p.price, 0) / properties.length || 0)}
            </div>
            <p className="text-sm text-gray-600">Prix moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Liste des propriétés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getPropertyTypeIcon(property.property_type)}
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                </div>
                {getStatusBadge(property.sale_date)}
              </div>
              <CardDescription className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{property.city} - {property.postal_code}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{property.surface} m²</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{property.rooms} pièces</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDate(property.sale_date)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {property.property_type}
                </span>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm">
                    Voir sur Carte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune propriété trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              Aucune propriété ne correspond à vos critères de recherche.
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

export default Properties

