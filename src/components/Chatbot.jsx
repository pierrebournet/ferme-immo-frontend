import { useState, useEffect, useRef } from 'react'
import { MessageSquare, Send, Bot, User, Sparkles, Phone, Mail, MapPin, Euro } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const Chatbot = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId] = useState(`session_${Date.now()}`)
  const [context, setContext] = useState({})
  const [generatedLead, setGeneratedLead] = useState(null)
  const [stats, setStats] = useState({
    totalConversations: 0,
    leadsGenerated: 0,
    avgResponseTime: 0,
    topIntentions: []
  })
  
  const messagesEndRef = useRef(null)

  // Messages d'accueil
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'bot',
      content: "Bonjour ! Je suis l'assistant virtuel de Pierre Bournet, spécialiste immobilier sur Toulouse Sud. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      suggestions: [
        "Je cherche à acheter un bien",
        "Je veux vendre ma propriété",
        "Informations sur le marché"
      ]
    }
    setMessages([welcomeMessage])

    // Charger les statistiques simulées
    setTimeout(() => {
      setStats({
        totalConversations: 127,
        leadsGenerated: 34,
        avgResponseTime: 1.2,
        topIntentions: [
          { name: 'Recherche achat', count: 45 },
          { name: 'Demande vente', count: 28 },
          { name: 'Info marché', count: 32 }
        ]
      })
    }, 1000)
  }, [])

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulation d'appel API au chatbot
    try {
      const response = await simulateChatbotResponse(messageText, context)
      
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: response.reponse,
          timestamp: new Date(),
          suggestions: response.suggestions,
          intention: response.intention
        }

        setMessages(prev => [...prev, botMessage])
        setContext(response.contexte)
        setIsTyping(false)

        // Si un lead a été créé
        if (response.lead_cree) {
          setGeneratedLead(response.lead_cree)
        }
      }, 1000 + Math.random() * 1000) // Délai réaliste
    } catch (error) {
      setIsTyping(false)
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const simulateChatbotResponse = async (message, currentContext) => {
    // Simulation de l'API chatbot
    const responses = {
      salutation: [
        "Parfait ! Je suis là pour vous accompagner dans votre projet immobilier. Que recherchez-vous exactement ?",
        "Excellent ! Parlons de votre projet. Souhaitez-vous acheter ou vendre un bien ?"
      ],
      recherche_achat: [
        "Parfait ! Vous souhaitez acheter un bien immobilier. Quel type de bien vous intéresse ? (appartement, maison, terrain...)",
        "Excellente nouvelle ! Pour mieux vous conseiller, pouvez-vous me dire dans quel secteur vous cherchez et votre budget approximatif ?"
      ],
      recherche_vente: [
        "Je comprends que vous souhaitez vendre votre bien. Pouvez-vous me donner quelques détails : type de bien, localisation, surface approximative ?",
        "Parfait ! La vente d'un bien nécessite une expertise précise. Dans quel quartier se trouve votre propriété ?"
      ],
      budget: [
        "Merci pour cette information sur votre budget. Cela m'aide à mieux cibler les biens qui pourraient vous convenir.",
        "Parfait ! Avec ces éléments budgétaires, je peux vous proposer des biens adaptés à vos moyens."
      ],
      localisation: [
        "Excellent choix de secteur ! Je connais très bien cette zone. Avez-vous des préférences particulières dans ce quartier ?",
        "Très bon choix ! Cette localisation présente de nombreux avantages. Cherchez-vous quelque chose de spécifique ?"
      ],
      contact: [
        "Merci pour vos coordonnées ! Je les transmets immédiatement à Pierre Bournet qui vous contactera rapidement.",
        "Parfait ! Vos informations sont enregistrées. Un expert va vous recontacter sous 24h pour approfondir votre projet."
      ]
    }

    // Analyser l'intention (simulation)
    const intention = analyzeIntention(message)
    const responseTexts = responses[intention] || responses.salutation
    const response = responseTexts[Math.floor(Math.random() * responseTexts.length)]

    // Générer des suggestions
    const suggestions = generateSuggestions(intention, currentContext)

    // Mettre à jour le contexte
    const newContext = updateContext(currentContext, intention, message)

    // Vérifier si on peut créer un lead
    let leadCree = null
    if (canCreateLead(newContext)) {
      leadCree = {
        id: Math.floor(Math.random() * 1000),
        first_name: 'Prospect',
        last_name: 'Chatbot',
        email: newContext.email || 'prospect@chatbot.com',
        phone: newContext.telephone,
        lead_type: newContext.type_projet === 'achat' ? 'buyer' : 'seller',
        budget_min: newContext.budget ? parseFloat(newContext.budget) * 0.8 : null,
        budget_max: newContext.budget ? parseFloat(newContext.budget) * 1.2 : null,
        location_interest: newContext.localisation,
        source: 'chatbot',
        score: Math.random() * 4 + 6, // Score entre 6 et 10
        status: 'new'
      }
    }

    return {
      reponse: response,
      intention: intention,
      contexte: newContext,
      suggestions: suggestions,
      lead_cree: leadCree
    }
  }

  const analyzeIntention = (message) => {
    const msg = message.toLowerCase()
    
    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello')) {
      return 'salutation'
    }
    if (msg.includes('acheter') || msg.includes('achat') || msg.includes('acquérir')) {
      return 'recherche_achat'
    }
    if (msg.includes('vendre') || msg.includes('vente') || msg.includes('céder')) {
      return 'recherche_vente'
    }
    if (msg.includes('budget') || msg.includes('prix') || msg.includes('euros') || msg.includes('€')) {
      return 'budget'
    }
    if (msg.includes('toulouse') || msg.includes('quartier') || msg.includes('secteur')) {
      return 'localisation'
    }
    if (msg.includes('@') || msg.includes('email') || msg.includes('téléphone') || msg.includes('06')) {
      return 'contact'
    }
    
    return 'autre'
  }

  const generateSuggestions = (intention, context) => {
    const suggestionMap = {
      salutation: [
        "Je cherche à acheter un bien",
        "Je veux vendre ma propriété",
        "J'ai des questions sur le marché"
      ],
      recherche_achat: [
        "Une maison avec jardin",
        "Un appartement 3 pièces",
        "Dans le centre de Toulouse"
      ],
      recherche_vente: [
        "Une maison de 120m²",
        "Un appartement T3",
        "Dans le quartier des Minimes"
      ],
      budget: [
        "Entre 200 000 et 300 000 €",
        "Jusqu'à 400 000 €",
        "Je suis flexible sur le budget"
      ],
      localisation: [
        "Toulouse Sud",
        "Les Minimes",
        "Centre-ville"
      ],
      autre: [
        "Je cherche à acheter",
        "Je veux vendre",
        "Informations sur les prix"
      ]
    }

    return suggestionMap[intention] || suggestionMap.autre
  }

  const updateContext = (currentContext, intention, message) => {
    const newContext = { ...currentContext }
    
    if (intention === 'recherche_achat') {
      newContext.type_projet = 'achat'
    } else if (intention === 'recherche_vente') {
      newContext.type_projet = 'vente'
    } else if (intention === 'budget') {
      const budgetMatch = message.match(/(\d+(?:\s*\d+)*)\s*(?:euros?|€)/i)
      if (budgetMatch) {
        newContext.budget = budgetMatch[1].replace(/\s/g, '')
      }
    } else if (intention === 'localisation') {
      if (message.toLowerCase().includes('toulouse')) {
        newContext.localisation = 'Toulouse'
      }
    } else if (intention === 'contact') {
      const emailMatch = message.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
      if (emailMatch) {
        newContext.email = emailMatch[0]
      }
      
      const phoneMatch = message.match(/(?:\+33|0)[1-9](?:[0-9]{8})/)
      if (phoneMatch) {
        newContext.telephone = phoneMatch[0]
      }
    }

    newContext.nb_messages = (newContext.nb_messages || 0) + 1
    return newContext
  }

  const canCreateLead = (context) => {
    return context.type_projet && (context.email || context.telephone)
  }

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chatbot IA</h1>
          <p className="text-gray-600 mt-1">Assistant virtuel pour la pré-qualification des prospects</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            En ligne
          </Badge>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{stats.totalConversations}</div>
            <p className="text-sm text-gray-600">Conversations totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.leadsGenerated}</div>
            <p className="text-sm text-gray-600">Leads générés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}s</div>
            <p className="text-sm text-gray-600">Temps de réponse moyen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {stats.leadsGenerated > 0 ? Math.round((stats.leadsGenerated / stats.totalConversations) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-600">Taux de conversion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interface de Chat */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Conversation en Direct</span>
              </CardTitle>
              <CardDescription>
                Testez l'assistant IA et voyez comment il qualifie les prospects
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Zone de messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-900 border'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === 'bot' ? (
                          <Bot className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-75">
                          {formatTimestamp(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.type === 'bot' && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Indicateur de frappe */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 border px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Zone de saisie */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-6">
          {/* Contexte de conversation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>Contexte IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Messages échangés:</span>
                  <span className="text-gray-600 ml-2">{context.nb_messages || 0}</span>
                </div>
                {context.type_projet && (
                  <div>
                    <span className="font-medium text-gray-900">Type de projet:</span>
                    <Badge variant="outline" className="ml-2">
                      {context.type_projet === 'achat' ? 'Acheteur' : 'Vendeur'}
                    </Badge>
                  </div>
                )}
                {context.budget && (
                  <div className="flex items-center space-x-2">
                    <Euro className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Budget:</span>
                    <span className="text-gray-600">{parseInt(context.budget).toLocaleString('fr-FR')} €</span>
                  </div>
                )}
                {context.localisation && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Localisation:</span>
                    <span className="text-gray-600">{context.localisation}</span>
                  </div>
                )}
                {context.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Email:</span>
                    <span className="text-gray-600 text-xs">{context.email}</span>
                  </div>
                )}
                {context.telephone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Téléphone:</span>
                    <span className="text-gray-600">{context.telephone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lead généré */}
          {generatedLead && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Sparkles className="h-4 w-4" />
                  <span>Lead Généré !</span>
                </CardTitle>
                <CardDescription>
                  Un nouveau prospect a été créé automatiquement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Nom:</span>
                    <span className="ml-2">{generatedLead.first_name} {generatedLead.last_name}</span>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <Badge variant="outline" className="ml-2">
                      {generatedLead.lead_type === 'buyer' ? 'Acheteur' : 'Vendeur'}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Score IA:</span>
                    <span className="ml-2 font-bold text-green-600">
                      {generatedLead.score.toFixed(1)}/10
                    </span>
                  </div>
                  {generatedLead.budget_min && (
                    <div>
                      <span className="font-medium">Budget:</span>
                      <span className="ml-2">
                        {generatedLead.budget_min.toLocaleString('fr-FR')} - {generatedLead.budget_max.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Voir dans les Prospects
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Top intentions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Intentions Populaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.topIntentions.map((intention, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{intention.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {intention.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Chatbot

