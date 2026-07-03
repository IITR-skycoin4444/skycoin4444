import { lazy, Suspense } from 'react';
import { Router, Route } from 'wouter';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { TRPCProvider } from '@/lib/trpc';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardLayoutSkeleton } from '@/components/DashboardLayoutSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Page imports
const ABTesting = lazy(() => import('./pages/ABTesting.tsx'));
const ABTestingAdvanced = lazy(() => import('./pages/ABTestingAdvanced.tsx'));
const AIAgentEconomy = lazy(() => import('./pages/features/ai/AIAgentEconomy.tsx'));
const AIAgentMarket = lazy(() => import('./pages/features/ai/AIAgentMarket.tsx'));
const AIAssistant = lazy(() => import('./pages/features/ai/AIAssistant.tsx'));
const AIBrain = lazy(() => import('./pages/features/ai/AIBrain.tsx'));
const AICodeStudio = lazy(() => import('./pages/features/ai/AICodeStudio.tsx'));
const AICopyStudio = lazy(() => import('./pages/features/ai/AICopyStudio.tsx'));
const AICore = lazy(() => import('./pages/features/ai/AICore.tsx'));
const AIEngineer = lazy(() => import('./pages/features/ai/AIEngineer.tsx'));
const AIGovernance = lazy(() => import('./pages/features/ai/AIGovernance.tsx'));
const AIMarketAgents = lazy(() => import('./pages/features/ai/AIMarketAgents.tsx'));
const AIMatchmaker = lazy(() => import('./pages/features/ai/AIMatchmaker.tsx'));
const AIModerationQueue = lazy(() => import('./pages/features/ai/AIModerationQueue.tsx'));
const AIPersonaFeed = lazy(() => import('./pages/features/ai/AIPersonaFeed.tsx'));
const AIPersonaSystem = lazy(() => import('./pages/features/ai/AIPersonaSystem.tsx'));
const AIToolsHub = lazy(() => import('./pages/features/ai/AIToolsHub.tsx'));
const AITrading = lazy(() => import('./pages/features/ai/AITrading.tsx'));
const AITrainingLoops = lazy(() => import('./pages/features/ai/AITrainingLoops.tsx'));
const APIDocs = lazy(() => import('./pages/features/api/APIDocs.tsx'));
const APIDocumentation = lazy(() => import('./pages/features/api/APIDocumentation.tsx'));
const APIIntegration = lazy(() => import('./pages/features/api/APIIntegration.tsx'));
const APIKeys = lazy(() => import('./pages/features/api/APIKeys.tsx'));
const APILogs = lazy(() => import('./pages/features/api/APILogs.tsx'));
const APIManagement = lazy(() => import('./pages/features/api/APIManagement.tsx'));
const APIMonitoring = lazy(() => import('./pages/features/api/APIMonitoring.tsx'));
const APIStatus = lazy(() => import('./pages/features/api/APIStatus.tsx'));
const APITesting = lazy(() => import('./pages/features/api/APITesting.tsx'));
const APIUsage = lazy(() => import('./pages/features/api/APIUsage.tsx'));
const APIVersioning = lazy(() => import('./pages/features/api/APIVersioning.tsx'));
const APYTracking = lazy(() => import('./pages/APYTracking.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const AccessControl = lazy(() => import('./pages/AccessControl.tsx'));
const AccessibilitySettings = lazy(() => import('./pages/features/user/AccessibilitySettings.tsx'));
const AccordionNavigation = lazy(() => import('./pages/AccordionNavigation.tsx'));
const AccountSettings = lazy(() => import('./pages/features/user/AccountSettings.tsx'));
const AchievementBadges = lazy(() => import('./pages/AchievementBadges.tsx'));
const Achievements = lazy(() => import('./pages/Achievements.tsx'));
const ActionObjects = lazy(() => import('./pages/ActionObjects.tsx'));
const ActionPanel = lazy(() => import('./pages/features/admin/ActionPanel.tsx'));
const ActivityFeed = lazy(() => import('./pages/features/social/ActivityFeed.tsx'));
const ActivityTracking = lazy(() => import('./pages/ActivityTracking.tsx'));
const AdaptivePersonalization = lazy(() => import('./pages/AdaptivePersonalization.tsx'));
const AdaptiveRoadmap = lazy(() => import('./pages/AdaptiveRoadmap.tsx'));
const AddBankAccount = lazy(() => import('./pages/features/user/AddBankAccount.tsx'));
const AddCreditCard = lazy(() => import('./pages/AddCreditCard.tsx'));
const AddressBook = lazy(() => import('./pages/AddressBook.tsx'));
const AddressLookup = lazy(() => import('./pages/AddressLookup.tsx'));
const Admin = lazy(() => import('./pages/features/admin/Admin.tsx'));
const AdminDashboard = lazy(() => import('./pages/features/admin/AdminDashboard.tsx'));
const AdminOrders = lazy(() => import('./pages/features/trading/AdminOrders.tsx'));
const AdminPanel = lazy(() => import('./pages/features/admin/AdminPanel.tsx'));
const AdminWalletManager = lazy(() => import('./pages/features/admin/AdminWalletManager.tsx'));
const AdvancedAdminPanel = lazy(() => import('./pages/features/admin/AdvancedAdminPanel.tsx'));
const AdvancedAnalytics = lazy(() => import('./pages/features/analytics/AdvancedAnalytics.tsx'));
const AdvancedOrders = lazy(() => import('./pages/features/trading/AdvancedOrders.tsx'));
const AdvancedSearch = lazy(() => import('./pages/AdvancedSearch.tsx'));
const AffiliateDashboard = lazy(() => import('./pages/features/admin/AffiliateDashboard.tsx'));
const AffiliateProgram = lazy(() => import('./pages/AffiliateProgram.tsx'));
const AgeGate = lazy(() => import('./pages/AgeGate.tsx'));
const AgeVerification = lazy(() => import('./pages/AgeVerification.tsx'));
const AgentBuilder = lazy(() => import('./pages/AgentBuilder.tsx'));
const AgentCity = lazy(() => import('./pages/AgentCity.tsx'));
const AgentCoordination = lazy(() => import('./pages/AgentCoordination.tsx'));
const AgentCoordinationHub = lazy(() => import('./pages/AgentCoordinationHub.tsx'));
const AgentDebate = lazy(() => import('./pages/AgentDebate.tsx'));
const AgentDetail = lazy(() => import('./pages/AgentDetail.tsx'));
const AgentMarketplace = lazy(() => import('./pages/features/marketplace/AgentMarketplace.tsx'));
const AgentPerformance = lazy(() => import('./pages/AgentPerformance.tsx'));
const AgentSprint = lazy(() => import('./pages/AgentSprint.tsx'));
const AgentsDashboard = lazy(() => import('./pages/features/admin/AgentsDashboard.tsx'));
const AiCore = lazy(() => import('./pages/wave2/AiCore.tsx'));
const AlertConfiguration = lazy(() => import('./pages/AlertConfiguration.tsx'));
const AlertDialog = lazy(() => import('./pages/AlertDialog.tsx'));
const AlertManagement = lazy(() => import('./pages/AlertManagement.tsx'));
const AmbientFeed = lazy(() => import('./pages/features/social/AmbientFeed.tsx'));
const Analytics = lazy(() => import('./pages/features/analytics/Analytics.tsx'));
const AnalyticsDashboard = lazy(() => import('./pages/features/admin/AnalyticsDashboard.tsx'));
const AnalyticsProducts = lazy(() => import('./pages/features/marketplace/AnalyticsProducts.tsx'));
const AnalyticsReports = lazy(() => import('./pages/features/analytics/AnalyticsReports.tsx'));
const AnomalyDetection = lazy(() => import('./pages/AnomalyDetection.tsx'));
const AntiSurveillance = lazy(() => import('./pages/AntiSurveillance.tsx'));
const ApprovalWorkflows = lazy(() => import('./pages/ApprovalWorkflows.tsx'));
const ArbitrageBot = lazy(() => import('./pages/ArbitrageBot.tsx'));
const Arcade = lazy(() => import('./pages/Arcade.tsx'));
const ArchiveManagement = lazy(() => import('./pages/ArchiveManagement.tsx'));
const AssetAllocation = lazy(() => import('./pages/AssetAllocation.tsx'));
const AssetManagement = lazy(() => import('./pages/AssetManagement.tsx'));
const AssetTracking = lazy(() => import('./pages/AssetTracking.tsx'));
const AssignmentTracker = lazy(() => import('./pages/AssignmentTracker.tsx'));
const AttributionModeling = lazy(() => import('./pages/AttributionModeling.tsx'));
const AudienceSegmentation = lazy(() => import('./pages/AudienceSegmentation.tsx'));
const AudioAnalytics = lazy(() => import('./pages/features/analytics/AudioAnalytics.tsx'));
const AudioEditing = lazy(() => import('./pages/AudioEditing.tsx'));
const AudioLibrary = lazy(() => import('./pages/AudioLibrary.tsx'));
const AudioPlayer = lazy(() => import('./pages/features/gaming/AudioPlayer.tsx'));
const AuditLog = lazy(() => import('./pages/AuditLog.tsx'));
const AuditLogs = lazy(() => import('./pages/AuditLogs.tsx'));
const AuditTrail = lazy(() => import('./pages/AuditTrail.tsx'));
const AutoResponder = lazy(() => import('./pages/AutoResponder.tsx'));
const AutomationEngine = lazy(() => import('./pages/AutomationEngine.tsx'));
const AutomationRules = lazy(() => import('./pages/AutomationRules.tsx'));
const AutomationWorkflows = lazy(() => import('./pages/AutomationWorkflows.tsx'));
const BackupManagement = lazy(() => import('./pages/BackupManagement.tsx'));
const Badges = lazy(() => import('./pages/Badges.tsx'));
const BanSuspendUser = lazy(() => import('./pages/features/user/BanSuspendUser.tsx'));
const BatchGeneration = lazy(() => import('./pages/BatchGeneration.tsx'));
const BattlePass = lazy(() => import('./pages/BattlePass.tsx'));
const BehavioralIntelligence = lazy(() => import('./pages/BehavioralIntelligence.tsx'));
const Beta = lazy(() => import('./pages/Beta.tsx'));
const BillingHistory = lazy(() => import('./pages/BillingHistory.tsx'));
const BlockBrowser = lazy(() => import('./pages/BlockBrowser.tsx'));
const BlockRewards = lazy(() => import('./pages/BlockRewards.tsx'));
const BlockUser = lazy(() => import('./pages/features/user/BlockUser.tsx'));
const BlockchainCustody = lazy(() => import('./pages/BlockchainCustody.tsx'));
const BlockchainMonitor = lazy(() => import('./pages/BlockchainMonitor.tsx'));
const BlockedUsers = lazy(() => import('./pages/features/user/BlockedUsers.tsx'));
const BlogEditor = lazy(() => import('./pages/BlogEditor.tsx'));
const BlogPublisher = lazy(() => import('./pages/BlogPublisher.tsx'));
const BookPage = lazy(() => import('./pages/BookPage.tsx'));
const Bookmarks = lazy(() => import('./pages/Bookmarks.tsx'));
const BountySystem = lazy(() => import('./pages/BountySystem.tsx'));
const BrandGuidelines = lazy(() => import('./pages/BrandGuidelines.tsx'));
const BreadcrumbNavigation = lazy(() => import('./pages/BreadcrumbNavigation.tsx'));
const BridgeProtocol = lazy(() => import('./pages/BridgeProtocol.tsx'));
const BridgeTransactions = lazy(() => import('./pages/features/wallet/BridgeTransactions.tsx'));
const BrowserExtension = lazy(() => import('./pages/BrowserExtension.tsx'));
const BudgetPlanner = lazy(() => import('./pages/BudgetPlanner.tsx'));
const BugReporting = lazy(() => import('./pages/features/analytics/BugReporting.tsx'));
const BuildOrder = lazy(() => import('./pages/features/trading/BuildOrder.tsx'));
const BuildRoadmap = lazy(() => import('./pages/BuildRoadmap.tsx'));
const BulkOperations = lazy(() => import('./pages/BulkOperations.tsx'));
const BulkOrdering = lazy(() => import('./pages/features/trading/BulkOrdering.tsx'));
const BulkUpload = lazy(() => import('./pages/BulkUpload.tsx'));
const CCPA = lazy(() => import('./pages/CCPA.tsx'));
const CDNManagement = lazy(() => import('./pages/CDNManagement.tsx'));
const CRM = lazy(() => import('./pages/CRM.tsx'));
const CacheManagement = lazy(() => import('./pages/CacheManagement.tsx'));
const Calculator = lazy(() => import('./pages/Calculator.tsx'));
const Calendar = lazy(() => import('./pages/Calendar.tsx'));
const CalendarView = lazy(() => import('./pages/CalendarView.tsx'));
const CampaignAnalytics = lazy(() => import('./pages/features/analytics/CampaignAnalytics.tsx'));
const CampaignBuilder = lazy(() => import('./pages/CampaignBuilder.tsx'));
const CampaignCreation = lazy(() => import('./pages/CampaignCreation.tsx'));
const CarRental = lazy(() => import('./pages/CarRental.tsx'));
const CardGridView = lazy(() => import('./pages/CardGridView.tsx'));
const CashFlowAnalysis = lazy(() => import('./pages/CashFlowAnalysis.tsx'));
const CategoryManagement = lazy(() => import('./pages/CategoryManagement.tsx'));
const CertificateManager = lazy(() => import('./pages/CertificateManager.tsx'));
const ChainExplorer = lazy(() => import('./pages/ChainExplorer.tsx'));
const ChangeLog = lazy(() => import('./pages/ChangeLog.tsx'));
const ChannelCustomization = lazy(() => import('./pages/ChannelCustomization.tsx'));
const Charity = lazy(() => import('./pages/Charity.tsx'));
const CharityLeaderboard = lazy(() => import('./pages/CharityLeaderboard.tsx'));
const ChartAnalysis = lazy(() => import('./pages/features/analytics/ChartAnalysis.tsx'));
const ChartDashboard = lazy(() => import('./pages/features/admin/ChartDashboard.tsx'));
const ChatBot = lazy(() => import('./pages/ChatBot.tsx'));
const ChatHistory = lazy(() => import('./pages/ChatHistory.tsx'));
const ChatMVP = lazy(() => import('./pages/ChatMVP.tsx'));
const CheckboxGroupForm = lazy(() => import('./pages/CheckboxGroupForm.tsx'));
const Checkout = lazy(() => import('./pages/Checkout.tsx'));
const CheckoutFlow = lazy(() => import('./pages/CheckoutFlow.tsx'));
const ChinaEdition = lazy(() => import('./pages/ChinaEdition.tsx'));
const ChurnPrediction = lazy(() => import('./pages/ChurnPrediction.tsx'));
const CitizenPassport = lazy(() => import('./pages/CitizenPassport.tsx'));
const CivilizationSimulator = lazy(() => import('./pages/CivilizationSimulator.tsx'));
const ClanWars = lazy(() => import('./pages/ClanWars.tsx'));
const ClassroomManagement = lazy(() => import('./pages/ClassroomManagement.tsx'));
const ClientLibraries = lazy(() => import('./pages/ClientLibraries.tsx'));
const ClosingChecklist = lazy(() => import('./pages/ClosingChecklist.tsx'));
const CodeCompletion = lazy(() => import('./pages/CodeCompletion.tsx'));
const CodeFormatter = lazy(() => import('./pages/CodeFormatter.tsx'));
const CodeHighlighting = lazy(() => import('./pages/CodeHighlighting.tsx'));
const CodeQuality = lazy(() => import('./pages/CodeQuality.tsx'));
const CodeQualityDashboard = lazy(() => import('./pages/features/admin/CodeQualityDashboard.tsx'));
const CodeRepository = lazy(() => import('./pages/CodeRepository.tsx'));
const CodeSamples = lazy(() => import('./pages/CodeSamples.tsx'));
const CohortAnalysis = lazy(() => import('./pages/CohortAnalysis.tsx'));
const ColorPickerDialog = lazy(() => import('./pages/ColorPickerDialog.tsx'));
const CommentThread = lazy(() => import('./pages/features/social/CommentThread.tsx'));
const Comments = lazy(() => import('./pages/features/social/Comments.tsx'));
const CommentsSection = lazy(() => import('./pages/features/social/CommentsSection.tsx'));
const CommissionManagement = lazy(() => import('./pages/CommissionManagement.tsx'));
const Community = lazy(() => import('./pages/Community.tsx'));
const CommunityCreate = lazy(() => import('./pages/CommunityCreate.tsx'));
const CommunityEngagement = lazy(() => import('./pages/CommunityEngagement.tsx'));
const CommunityGuidelines = lazy(() => import('./pages/CommunityGuidelines.tsx'));
const CommunityHub = lazy(() => import('./pages/CommunityHub.tsx'));
const CompanySimulator = lazy(() => import('./pages/CompanySimulator.tsx'));
const CompetitiveRadar = lazy(() => import('./pages/CompetitiveRadar.tsx'));
const ComplianceCenter = lazy(() => import('./pages/ComplianceCenter.tsx'));
const ComplianceChecker = lazy(() => import('./pages/ComplianceChecker.tsx'));
const ComplianceChecking = lazy(() => import('./pages/ComplianceChecking.tsx'));
const ComplianceDashboard = lazy(() => import('./pages/features/admin/ComplianceDashboard.tsx'));
const ComplianceReports = lazy(() => import('./pages/features/analytics/ComplianceReports.tsx'));
const ComponentShowcase = lazy(() => import('./pages/core/ComponentShowcase.tsx'));
const ComprehensiveEcosystemLanding = lazy(() => import('./pages/ComprehensiveEcosystemLanding.tsx'));
const ConfirmationDialog = lazy(() => import('./pages/ConfirmationDialog.tsx'));
const ConnectedApps = lazy(() => import('./pages/ConnectedApps.tsx'));
const ConnectionError = lazy(() => import('./pages/ConnectionError.tsx'));
const ConnectionRequests = lazy(() => import('./pages/ConnectionRequests.tsx'));
const ConnectorIntelligence = lazy(() => import('./pages/ConnectorIntelligence.tsx'));
const ContactManagement = lazy(() => import('./pages/ContactManagement.tsx'));
const ContactUsForm = lazy(() => import('./pages/ContactUsForm.tsx'));
const ContentAnalytics = lazy(() => import('./pages/features/analytics/ContentAnalytics.tsx'));
const ContentCalendar = lazy(() => import('./pages/features/content/ContentCalendar.tsx'));
const ContentCollaboration = lazy(() => import('./pages/features/content/ContentCollaboration.tsx'));
const ContentFlagging = lazy(() => import('./pages/features/content/ContentFlagging.tsx'));
const ContentLibrary = lazy(() => import('./pages/features/content/ContentLibrary.tsx'));
const ContentModeration = lazy(() => import('./pages/features/admin/ContentModeration.tsx'));
const ContentScheduler = lazy(() => import('./pages/features/content/ContentScheduler.tsx'));
const ContentScheduling = lazy(() => import('./pages/features/content/ContentScheduling.tsx'));
const ContentUpload = lazy(() => import('./pages/features/content/ContentUpload.tsx'));
const ContentVault = lazy(() => import('./pages/features/content/ContentVault.tsx'));
const ContextMenu = lazy(() => import('./pages/ContextMenu.tsx'));
const ContractABI = lazy(() => import('./pages/ContractABI.tsx'));
const ContractManagement = lazy(() => import('./pages/ContractManagement.tsx'));
const ContributionInterface = lazy(() => import('./pages/ContributionInterface.tsx'));
const ConversationArchive = lazy(() => import('./pages/ConversationArchive.tsx'));
const ConversationHistory = lazy(() => import('./pages/ConversationHistory.tsx'));
const ConversionFunnel = lazy(() => import('./pages/ConversionFunnel.tsx'));
const ConversionOptimization = lazy(() => import('./pages/ConversionOptimization.tsx'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy.tsx'));
const CopyrightManagement = lazy(() => import('./pages/CopyrightManagement.tsx'));
const CostAllocation = lazy(() => import('./pages/CostAllocation.tsx'));
const CostBasisCalculation = lazy(() => import('./pages/CostBasisCalculation.tsx'));
const CourseBuilder = lazy(() => import('./pages/features/education/CourseBuilder.tsx'));
const CourseCatalog = lazy(() => import('./pages/features/education/CourseCatalog.tsx'));
const CoverPhoto = lazy(() => import('./pages/CoverPhoto.tsx'));
const CreateArticle = lazy(() => import('./pages/CreateArticle.tsx'));
const CreateAudio = lazy(() => import('./pages/CreateAudio.tsx'));
const CreateDrop = lazy(() => import('./pages/CreateDrop.tsx'));
const CreateReel = lazy(() => import('./pages/CreateReel.tsx'));
const CreatorAnalytics = lazy(() => import('./pages/features/analytics/CreatorAnalytics.tsx'));
const CreatorDashboard = lazy(() => import('./pages/features/admin/CreatorDashboard.tsx'));
const CreatorEconomy = lazy(() => import('./pages/CreatorEconomy.tsx'));
const CreatorFunding = lazy(() => import('./pages/CreatorFunding.tsx'));
const CreatorGrants = lazy(() => import('./pages/CreatorGrants.tsx'));
const CreatorIntelligence = lazy(() => import('./pages/CreatorIntelligence.tsx'));
const CreatorMonetization = lazy(() => import('./pages/CreatorMonetization.tsx'));
const CreatorNetwork = lazy(() => import('./pages/CreatorNetwork.tsx'));
const CreatorOnboarding = lazy(() => import('./pages/CreatorOnboarding.tsx'));
const CreatorProfile = lazy(() => import('./pages/features/user/CreatorProfile.tsx'));
const CreatorSpotlight = lazy(() => import('./pages/CreatorSpotlight.tsx'));
const CreatorStudio = lazy(() => import('./pages/wave4/CreatorStudio.tsx'));
const CrossChainInterop = lazy(() => import('./pages/CrossChainInterop.tsx'));
const CrossChainSwap = lazy(() => import('./pages/features/trading/CrossChainSwap.tsx'));
const Crypto = lazy(() => import('./pages/features/wallet/Crypto.tsx'));
const CryptoEnhancementsPage = lazy(() => import('./pages/features/wallet/CryptoEnhancementsPage.tsx'));
const CryptoExchange = lazy(() => import('./pages/features/trading/CryptoExchange.tsx'));
const CryptoHub = lazy(() => import('./pages/features/wallet/CryptoHub.tsx'));
const CryptoNews = lazy(() => import('./pages/features/wallet/CryptoNews.tsx'));
const CryptoResearchHub = lazy(() => import('./pages/features/wallet/CryptoResearchHub.tsx'));
const CustomDashboard = lazy(() => import('./pages/features/admin/CustomDashboard.tsx'));
const CustomReports = lazy(() => import('./pages/features/analytics/CustomReports.tsx'));
const CustomerAnalytics = lazy(() => import('./pages/features/analytics/CustomerAnalytics.tsx'));
const CustomerDisputes = lazy(() => import('./pages/CustomerDisputes.tsx'));
const DAOGovernance = lazy(() => import('./pages/DAOGovernance.tsx'));
const DAOTreasury = lazy(() => import('./pages/DAOTreasury.tsx'));
const DCACalculator = lazy(() => import('./pages/DCACalculator.tsx'));
const DEXDepthChart = lazy(() => import('./pages/features/analytics/DEXDepthChart.tsx'));
const DMInbox = lazy(() => import('./pages/DMInbox.tsx'));
const Dashboard = lazy(() => import('./pages/features/admin/Dashboard.tsx'));
const DashboardOverview = lazy(() => import('./pages/features/admin/DashboardOverview.tsx'));
const DataExport = lazy(() => import('./pages/DataExport.tsx'));
const DataGrid = lazy(() => import('./pages/DataGrid.tsx'));
const DataLake = lazy(() => import('./pages/DataLake.tsx'));
const DataPrivacy = lazy(() => import('./pages/DataPrivacy.tsx'));
const DataProcessing = lazy(() => import('./pages/DataProcessing.tsx'));
const DataRetention = lazy(() => import('./pages/DataRetention.tsx'));
const DataTable = lazy(() => import('./pages/DataTable.tsx'));
const DataVisualization = lazy(() => import('./pages/DataVisualization.tsx'));
const DatabaseManagement = lazy(() => import('./pages/DatabaseManagement.tsx'));
const DateInputForm = lazy(() => import('./pages/DateInputForm.tsx'));
const DatePickerDialog = lazy(() => import('./pages/DatePickerDialog.tsx'));
const DatingDiscovery = lazy(() => import('./pages/features/social/DatingDiscovery.tsx'));
const DatingHome = lazy(() => import('./pages/features/social/DatingHome.tsx'));
const DatingMatches = lazy(() => import('./pages/features/social/DatingMatches.tsx'));
const DatingMessages = lazy(() => import('./pages/features/social/DatingMessages.tsx'));
const DatingPremium = lazy(() => import('./pages/features/social/DatingPremium.tsx'));
const DatingProfile = lazy(() => import('./pages/features/social/DatingProfile.tsx'));
const DatingProfileSetup = lazy(() => import('./pages/features/social/DatingProfileSetup.tsx'));
const DatingSubscription = lazy(() => import('./pages/features/social/DatingSubscription.tsx'));
const DayTradeRoom = lazy(() => import('./pages/features/trading/DayTradeRoom.tsx'));
const DeFi = lazy(() => import('./pages/DeFi.tsx'));
const DecentralizedIdentity = lazy(() => import('./pages/DecentralizedIdentity.tsx'));
const DefensibilityMoat = lazy(() => import('./pages/DefensibilityMoat.tsx'));
const DeleteAccount = lazy(() => import('./pages/features/user/DeleteAccount.tsx'));
const DeleteContent = lazy(() => import('./pages/features/content/DeleteContent.tsx'));
const DepartmentManagement = lazy(() => import('./pages/DepartmentManagement.tsx'));
const DependencyGraph = lazy(() => import('./pages/DependencyGraph.tsx'));
const DeploymentPipeline = lazy(() => import('./pages/DeploymentPipeline.tsx'));
const DeprecationPolicy = lazy(() => import('./pages/DeprecationPolicy.tsx'));
const DerivativeTrading = lazy(() => import('./pages/DerivativeTrading.tsx'));
const DerivativesTrading = lazy(() => import('./pages/DerivativesTrading.tsx'));
const DestinationGuide = lazy(() => import('./pages/DestinationGuide.tsx'));
const DestinyEngine = lazy(() => import('./pages/DestinyEngine.tsx'));
const DevOps = lazy(() => import('./pages/DevOps.tsx'));
const DeveloperArea = lazy(() => import('./pages/DeveloperArea.tsx'));
const DeveloperCommunity = lazy(() => import('./pages/DeveloperCommunity.tsx'));
const DeveloperMarketplace = lazy(() => import('./pages/features/marketplace/DeveloperMarketplace.tsx'));
const DeveloperProtocol = lazy(() => import('./pages/DeveloperProtocol.tsx'));
const DifficultyCalculator = lazy(() => import('./pages/DifficultyCalculator.tsx'));
const DifficultyTracking = lazy(() => import('./pages/DifficultyTracking.tsx'));
const DigitalArtStore = lazy(() => import('./pages/features/marketplace/DigitalArtStore.tsx'));
const DigitalNationMode = lazy(() => import('./pages/DigitalNationMode.tsx'));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin.tsx'));
const DirectMessages = lazy(() => import('./pages/DirectMessages.tsx'));
const DirectMessaging = lazy(() => import('./pages/DirectMessaging.tsx'));
const DisasterRecovery = lazy(() => import('./pages/DisasterRecovery.tsx'));
const DiscordIntegration = lazy(() => import('./pages/DiscordIntegration.tsx'));
const Discover = lazy(() => import('./pages/Discover.tsx'));
const DiscussionBoard = lazy(() => import('./pages/DiscussionBoard.tsx'));
const DiscussionForums = lazy(() => import('./pages/DiscussionForums.tsx'));
const DisputeResolution = lazy(() => import('./pages/DisputeResolution.tsx'));
const DistributionChannels = lazy(() => import('./pages/DistributionChannels.tsx'));
const DocumentEditor = lazy(() => import('./pages/features/api/DocumentEditor.tsx'));
const DocumentManagement = lazy(() => import('./pages/features/api/DocumentManagement.tsx'));
const DocumentSharing = lazy(() => import('./pages/features/api/DocumentSharing.tsx'));
const DocumentSigning = lazy(() => import('./pages/features/api/DocumentSigning.tsx'));
const Documentation = lazy(() => import('./pages/features/api/Documentation.tsx'));
const DogecoinPoolSelection = lazy(() => import('./pages/DogecoinPoolSelection.tsx'));
const DomainManagement = lazy(() => import('./pages/DomainManagement.tsx'));
const DonationProcessing = lazy(() => import('./pages/DonationProcessing.tsx'));
const DropdownMenu = lazy(() => import('./pages/DropdownMenu.tsx'));
const ENSResolver = lazy(() => import('./pages/ENSResolver.tsx'));
const EarningsTracker = lazy(() => import('./pages/EarningsTracker.tsx'));
const EarningsTracking = lazy(() => import('./pages/EarningsTracking.tsx'));
const EconomicLayer = lazy(() => import('./pages/EconomicLayer.tsx'));
const Economics = lazy(() => import('./pages/Economics.tsx'));
const EconomyControl = lazy(() => import('./pages/EconomyControl.tsx'));
const Ecosystem = lazy(() => import('./pages/Ecosystem.tsx'));
const EditProfile = lazy(() => import('./pages/features/user/EditProfile.tsx'));
const EmailCampaigns = lazy(() => import('./pages/EmailCampaigns.tsx'));
const EmailConfiguration = lazy(() => import('./pages/EmailConfiguration.tsx'));
const EmailInputForm = lazy(() => import('./pages/EmailInputForm.tsx'));
const EmailIntegration = lazy(() => import('./pages/EmailIntegration.tsx'));
const EmailNotifications = lazy(() => import('./pages/EmailNotifications.tsx'));
const EmailTemplates = lazy(() => import('./pages/EmailTemplates.tsx'));
const EmailVerification = lazy(() => import('./pages/EmailVerification.tsx'));
const EmbedSDK = lazy(() => import('./pages/EmbedSDK.tsx'));
const EmptySearchState = lazy(() => import('./pages/features/analytics/EmptySearchState.tsx'));
const EngagementMetrics = lazy(() => import('./pages/EngagementMetrics.tsx'));
const EngagementStats = lazy(() => import('./pages/features/analytics/EngagementStats.tsx'));
const Engineer = lazy(() => import('./pages/Engineer.tsx'));
const Enterprise = lazy(() => import('./pages/Enterprise.tsx'));
const EnterpriseAPI = lazy(() => import('./pages/EnterpriseAPI.tsx'));
const EnterpriseAnalytics = lazy(() => import('./pages/features/analytics/EnterpriseAnalytics.tsx'));
const EnterpriseBilling = lazy(() => import('./pages/EnterpriseBilling.tsx'));
const EntityProfile = lazy(() => import('./pages/features/user/EntityProfile.tsx'));
const EnvironmentManagement = lazy(() => import('./pages/EnvironmentManagement.tsx'));
const Error403 = lazy(() => import('./pages/Error403.tsx'));
const Error404 = lazy(() => import('./pages/Error404.tsx'));
const Error500 = lazy(() => import('./pages/Error500.tsx'));
const Error503 = lazy(() => import('./pages/Error503.tsx'));
const ErrorDialog = lazy(() => import('./pages/ErrorDialog.tsx'));
const ErrorTracking = lazy(() => import('./pages/ErrorTracking.tsx'));
const EscrowShop = lazy(() => import('./pages/features/marketplace/EscrowShop.tsx'));
const EthereumPoolSelector = lazy(() => import('./pages/EthereumPoolSelector.tsx'));
const EventAnalytics = lazy(() => import('./pages/features/analytics/EventAnalytics.tsx'));
const EventCalendar = lazy(() => import('./pages/EventCalendar.tsx'));
const EventCreation = lazy(() => import('./pages/EventCreation.tsx'));
const EventPlanner = lazy(() => import('./pages/EventPlanner.tsx'));
const EventRegistration = lazy(() => import('./pages/EventRegistration.tsx'));
const Events = lazy(() => import('./pages/Events.tsx'));
const ExecutionHistory = lazy(() => import('./pages/ExecutionHistory.tsx'));
const ExerciseLibrary = lazy(() => import('./pages/ExerciseLibrary.tsx'));
const ExpenseManagement = lazy(() => import('./pages/ExpenseManagement.tsx'));
const ExpenseTracker = lazy(() => import('./pages/ExpenseTracker.tsx'));
const ExperimentFactory = lazy(() => import('./pages/ExperimentFactory.tsx'));
const ExperimentTracker = lazy(() => import('./pages/ExperimentTracker.tsx'));
const Explore = lazy(() => import('./pages/wave4/Explore.tsx'));
const ExportData = lazy(() => import('./pages/ExportData.tsx'));
const FAQManagement = lazy(() => import('./pages/FAQManagement.tsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.tsx'));
const Farming = lazy(() => import('./pages/Farming.tsx'));
const Favorites = lazy(() => import('./pages/Favorites.tsx'));
const FeatureRequests = lazy(() => import('./pages/FeatureRequests.tsx'));
const FeatureTour = lazy(() => import('./pages/FeatureTour.tsx'));
const Features = lazy(() => import('./pages/Features.tsx'));
const FeeCalculation = lazy(() => import('./pages/FeeCalculation.tsx'));
const FeedWithPosts = lazy(() => import('./pages/features/social/FeedWithPosts.tsx'));
const Feedback = lazy(() => import('./pages/features/social/Feedback.tsx'));
const FeedbackDialog = lazy(() => import('./pages/features/social/FeedbackDialog.tsx'));
const FeedbackForm = lazy(() => import('./pages/features/social/FeedbackForm.tsx'));
const FeedbackHub = lazy(() => import('./pages/features/social/FeedbackHub.tsx'));
const FileBrowser = lazy(() => import('./pages/FileBrowser.tsx'));
const FileConverter = lazy(() => import('./pages/FileConverter.tsx'));
const FileDownload = lazy(() => import('./pages/FileDownload.tsx'));
const FilePreview = lazy(() => import('./pages/FilePreview.tsx'));
const FileSharing = lazy(() => import('./pages/FileSharing.tsx'));
const FileUploadDialog = lazy(() => import('./pages/FileUploadDialog.tsx'));
const FileUploadForm = lazy(() => import('./pages/FileUploadForm.tsx'));
const FileUploadProgress = lazy(() => import('./pages/FileUploadProgress.tsx'));
const FileVersioning = lazy(() => import('./pages/FileVersioning.tsx'));
const FilterPanel = lazy(() => import('./pages/features/admin/FilterPanel.tsx'));
const FinancialReports = lazy(() => import('./pages/features/analytics/FinancialReports.tsx'));
const FlashLoans = lazy(() => import('./pages/FlashLoans.tsx'));
const FlightSearch = lazy(() => import('./pages/FlightSearch.tsx'));
const FollowList = lazy(() => import('./pages/features/social/FollowList.tsx'));
const FollowRequests = lazy(() => import('./pages/features/social/FollowRequests.tsx'));
const FollowSystem = lazy(() => import('./pages/features/social/FollowSystem.tsx'));
const FollowUnfollow = lazy(() => import('./pages/features/social/FollowUnfollow.tsx'));
const FollowerList = lazy(() => import('./pages/features/social/FollowerList.tsx'));
const FollowersNetwork = lazy(() => import('./pages/features/social/FollowersNetwork.tsx'));
const ForecastingEngine = lazy(() => import('./pages/ForecastingEngine.tsx'));
const ForumCategories = lazy(() => import('./pages/ForumCategories.tsx'));
const FrameworkTemplates = lazy(() => import('./pages/FrameworkTemplates.tsx'));
const FreeWillDashboard = lazy(() => import('./pages/features/admin/FreeWillDashboard.tsx'));
const FundraiserTools = lazy(() => import('./pages/FundraiserTools.tsx'));
const GDPR = lazy(() => import('./pages/GDPR.tsx'));
const GTMStrategy = lazy(() => import('./pages/GTMStrategy.tsx'));
const GainLossTracking = lazy(() => import('./pages/GainLossTracking.tsx'));
const GameBlackjack = lazy(() => import('./pages/features/gaming/GameBlackjack.tsx'));
const GameBlockBuilder = lazy(() => import('./pages/features/gaming/GameBlockBuilder.tsx'));
const GameChat = lazy(() => import('./pages/features/gaming/GameChat.tsx'));
const GameCrash = lazy(() => import('./pages/features/gaming/GameCrash.tsx'));
const GameCryptoQuiz = lazy(() => import('./pages/features/gaming/GameCryptoQuiz.tsx'));
const GameFiQuestBoard = lazy(() => import('./pages/features/gaming/GameFiQuestBoard.tsx'));
const GameLobby = lazy(() => import('./pages/features/gaming/GameLobby.tsx'));
const GameRoom = lazy(() => import('./pages/features/gaming/GameRoom.tsx'));
const GameSettings = lazy(() => import('./pages/features/gaming/GameSettings.tsx'));
const GameSlots = lazy(() => import('./pages/features/gaming/GameSlots.tsx'));
const GameTokenTap = lazy(() => import('./pages/features/gaming/GameTokenTap.tsx'));
const Gaming = lazy(() => import('./pages/wave3/Gaming.tsx'));
const GamingForCharity = lazy(() => import('./pages/GamingForCharity.tsx'));
const GanttChart = lazy(() => import('./pages/features/analytics/GanttChart.tsx'));
const GasFeeEstimator = lazy(() => import('./pages/GasFeeEstimator.tsx'));
const GasPriceMonitor = lazy(() => import('./pages/GasPriceMonitor.tsx'));
const GasTracker = lazy(() => import('./pages/GasTracker.tsx'));
const GeneralSettings = lazy(() => import('./pages/features/user/GeneralSettings.tsx'));
const GeneratedApiExplorer = lazy(() => import('./pages/GeneratedApiExplorer.tsx'));
const GeneratedGallery = lazy(() => import('./pages/GeneratedGallery.tsx'));
const GettingStartedGuide = lazy(() => import('./pages/GettingStartedGuide.tsx'));
const GhostMode = lazy(() => import('./pages/GhostMode.tsx'));
const GlobalOperationsCenter = lazy(() => import('./pages/GlobalOperationsCenter.tsx'));
const GlobalSearch = lazy(() => import('./pages/GlobalSearch.tsx'));
const Governance = lazy(() => import('./pages/wave3/Governance.tsx'));
const GovernanceVoting = lazy(() => import('./pages/GovernanceVoting.tsx'));
const GovernanceWizard = lazy(() => import('./pages/GovernanceWizard.tsx'));
const GradeBook = lazy(() => import('./pages/GradeBook.tsx'));
const GroupChat = lazy(() => import('./pages/GroupChat.tsx'));
const GroupChats = lazy(() => import('./pages/GroupChats.tsx'));
const GroupDirectory = lazy(() => import('./pages/GroupDirectory.tsx'));
const GroupEvents = lazy(() => import('./pages/GroupEvents.tsx'));
const GroupManagement = lazy(() => import('./pages/GroupManagement.tsx'));
const Growth = lazy(() => import('./pages/Growth.tsx'));
const Guilds = lazy(() => import('./pages/Guilds.tsx'));
const HIPAA = lazy(() => import('./pages/HIPAA.tsx'));
const HOPEAIControl = lazy(() => import('./pages/HOPEAIControl.tsx'));
const HashRateMonitor = lazy(() => import('./pages/HashRateMonitor.tsx'));
const HashtagExplorer = lazy(() => import('./pages/HashtagExplorer.tsx'));
const HashtagSearch = lazy(() => import('./pages/HashtagSearch.tsx'));
const Hashtags = lazy(() => import('./pages/Hashtags.tsx'));
const HealthArticles = lazy(() => import('./pages/HealthArticles.tsx'));
const HealthDashboard = lazy(() => import('./pages/features/admin/HealthDashboard.tsx'));
const HealthGoals = lazy(() => import('./pages/HealthGoals.tsx'));
const HelpCenter = lazy(() => import('./pages/HelpCenter.tsx'));
const Home = lazy(() => import('./pages/core/Home.tsx'));
const HopeAI = lazy(() => import('./pages/HopeAI.tsx'));
const HopeAIAdvanced = lazy(() => import('./pages/HopeAIAdvanced.tsx'));
const HopeAIMeta = lazy(() => import('./pages/HopeAIMeta.tsx'));
const HopeAIPage = lazy(() => import('./pages/HopeAIPage.tsx'));
const HopeAIUpgrades = lazy(() => import('./pages/HopeAIUpgrades.tsx'));
const HotelSearch = lazy(() => import('./pages/HotelSearch.tsx'));
const HubSpotIntegration = lazy(() => import('./pages/HubSpotIntegration.tsx'));
const ICOLaunchpad = lazy(() => import('./pages/ICOLaunchpad.tsx'));
const IFTTT = lazy(() => import('./pages/IFTTT.tsx'));
const IITR = lazy(() => import('./pages/IITR.tsx'));
const ITServicesLanding = lazy(() => import('./pages/ITServicesLanding.tsx'));
const ITServicesPortal = lazy(() => import('./pages/ITServicesPortal.tsx'));
const ImageEditor = lazy(() => import('./pages/ImageEditor.tsx'));
const ImageGallery = lazy(() => import('./pages/ImageGallery.tsx'));
const ImageTools = lazy(() => import('./pages/ImageTools.tsx'));
const ImageViewer = lazy(() => import('./pages/ImageViewer.tsx'));
const ImpactMap = lazy(() => import('./pages/ImpactMap.tsx'));
const ImpactMetrics = lazy(() => import('./pages/ImpactMetrics.tsx'));
const InAppNotifications = lazy(() => import('./pages/InAppNotifications.tsx'));
const InGameCurrency = lazy(() => import('./pages/features/gaming/InGameCurrency.tsx'));
const IncidentManagement = lazy(() => import('./pages/IncidentManagement.tsx'));
const InputDialog = lazy(() => import('./pages/InputDialog.tsx'));
const InstructorDashboard = lazy(() => import('./pages/features/admin/InstructorDashboard.tsx'));
const IntegrationSetup = lazy(() => import('./pages/IntegrationSetup.tsx'));
const Integrations = lazy(() => import('./pages/Integrations.tsx'));
const InventoryManagement = lazy(() => import('./pages/InventoryManagement.tsx'));
const InvestmentGoals = lazy(() => import('./pages/InvestmentGoals.tsx'));
const InvestorMetrics = lazy(() => import('./pages/InvestorMetrics.tsx'));
const InvestorPitch = lazy(() => import('./pages/InvestorPitch.tsx'));
const InvestorPortal = lazy(() => import('./pages/InvestorPortal.tsx'));
const InvestorRoom = lazy(() => import('./pages/InvestorRoom.tsx'));
const InvoiceDetails = lazy(() => import('./pages/InvoiceDetails.tsx'));
const InvoiceManagement = lazy(() => import('./pages/InvoiceManagement.tsx'));
const KYCVerification = lazy(() => import('./pages/KYCVerification.tsx'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase.tsx'));
const LDAPIntegration = lazy(() => import('./pages/LDAPIntegration.tsx'));
const LTVAnalysis = lazy(() => import('./pages/LTVAnalysis.tsx'));
const LandingPage = lazy(() => import('./pages/core/LandingPage.tsx'));
const LanguageExchangeAdmin = lazy(() => import('./pages/features/trading/LanguageExchangeAdmin.tsx'));
const LanguagePartnerDiscovery = lazy(() => import('./pages/LanguagePartnerDiscovery.tsx'));
const LanguageSelector = lazy(() => import('./pages/LanguageSelector.tsx'));
const LanguageSettings = lazy(() => import('./pages/features/user/LanguageSettings.tsx'));
const LeadScoring = lazy(() => import('./pages/LeadScoring.tsx'));
const Leaderboard = lazy(() => import('./pages/Leaderboard.tsx'));
const Leaderboards = lazy(() => import('./pages/Leaderboards.tsx'));
const Learning = lazy(() => import('./pages/features/education/Learning.tsx'));
const LearningPath = lazy(() => import('./pages/features/education/LearningPath.tsx'));
const LegalDocuments = lazy(() => import('./pages/features/api/LegalDocuments.tsx'));
const LegendaryStatus = lazy(() => import('./pages/features/analytics/LegendaryStatus.tsx'));
const LendingBorrow = lazy(() => import('./pages/LendingBorrow.tsx'));
const LendingBorrowing = lazy(() => import('./pages/LendingBorrowing.tsx'));
const LessonEditor = lazy(() => import('./pages/LessonEditor.tsx'));
const LifeCommand = lazy(() => import('./pages/LifeCommand.tsx'));
const Lightbox = lazy(() => import('./pages/Lightbox.tsx'));
const LikeReactionSystem = lazy(() => import('./pages/LikeReactionSystem.tsx'));
const Likes = lazy(() => import('./pages/Likes.tsx'));
const LiquidStaking = lazy(() => import('./pages/LiquidStaking.tsx'));
const LiquidityPools = lazy(() => import('./pages/LiquidityPools.tsx'));
const ListView = lazy(() => import('./pages/ListView.tsx'));
const Live = lazy(() => import('./pages/Live.tsx'));
const LiveChat = lazy(() => import('./pages/LiveChat.tsx'));
const LiveGifting = lazy(() => import('./pages/LiveGifting.tsx'));
const LiveReactions = lazy(() => import('./pages/LiveReactions.tsx'));
const LiveStreamSetup = lazy(() => import('./pages/features/content/LiveStreamSetup.tsx'));
const LiveStreaming = lazy(() => import('./pages/features/content/LiveStreaming.tsx'));
const LivestreamDashboard = lazy(() => import('./pages/features/admin/LivestreamDashboard.tsx'));
const LoadBalancing = lazy(() => import('./pages/LoadBalancing.tsx'));
const LoadingDialog = lazy(() => import('./pages/LoadingDialog.tsx'));
const LogViewer = lazy(() => import('./pages/LogViewer.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const LogisticsOptimizer = lazy(() => import('./pages/LogisticsOptimizer.tsx'));
const MLInsights = lazy(() => import('./pages/MLInsights.tsx'));
const MLModels = lazy(() => import('./pages/MLModels.tsx'));
const MailingLists = lazy(() => import('./pages/MailingLists.tsx'));
const MainDashboard = lazy(() => import('./pages/features/admin/MainDashboard.tsx'));
const MaintenanceMode = lazy(() => import('./pages/MaintenanceMode.tsx'));
const MapView = lazy(() => import('./pages/MapView.tsx'));
const MarginTrading = lazy(() => import('./pages/MarginTrading.tsx'));
const MarkdownRendering = lazy(() => import('./pages/MarkdownRendering.tsx'));
const MarketSentiment = lazy(() => import('./pages/features/marketplace/MarketSentiment.tsx'));
const MarketingROI = lazy(() => import('./pages/features/marketplace/MarketingROI.tsx'));
const Marketplace = lazy(() => import('./pages/features/marketplace/Marketplace.tsx'));
const MarketplaceAnalytics = lazy(() => import('./pages/features/marketplace/MarketplaceAnalytics.tsx'));
const MarketplaceSection = lazy(() => import('./pages/mission-control/MarketplaceSection.tsx'));
const MasterArchitecture = lazy(() => import('./pages/MasterArchitecture.tsx'));
const MatchChat = lazy(() => import('./pages/MatchChat.tsx'));
const MatchFeed = lazy(() => import('./pages/features/social/MatchFeed.tsx'));
const MatchSpace = lazy(() => import('./pages/MatchSpace.tsx'));
const MatchingAlgorithm = lazy(() => import('./pages/MatchingAlgorithm.tsx'));
const Matchmaking = lazy(() => import('./pages/Matchmaking.tsx'));
const MealPlans = lazy(() => import('./pages/MealPlans.tsx'));
const MediaCarousel = lazy(() => import('./pages/features/content/MediaCarousel.tsx'));
const MediaGallery = lazy(() => import('./pages/features/content/MediaGallery.tsx'));
const MedicationReminder = lazy(() => import('./pages/MedicationReminder.tsx'));
const MegaMarketplace = lazy(() => import('./pages/features/marketplace/MegaMarketplace.tsx'));
const MembershipTiers = lazy(() => import('./pages/MembershipTiers.tsx'));
const MemoryConstellation = lazy(() => import('./pages/MemoryConstellation.tsx'));
const MemoryGraphVisualizer = lazy(() => import('./pages/MemoryGraphVisualizer.tsx'));
const MemorySystem = lazy(() => import('./pages/MemorySystem.tsx'));
const Mentions = lazy(() => import('./pages/Mentions.tsx'));
const MessageEncryption = lazy(() => import('./pages/MessageEncryption.tsx'));
const MessageSearch = lazy(() => import('./pages/MessageSearch.tsx'));
const Messages = lazy(() => import('./pages/Messages.tsx'));
const MetaversePortal = lazy(() => import('./pages/MetaversePortal.tsx'));
const MilestoneTracking = lazy(() => import('./pages/MilestoneTracking.tsx'));
const MinerDashboard = lazy(() => import('./pages/features/admin/MinerDashboard.tsx'));
const MiningCalculator = lazy(() => import('./pages/MiningCalculator.tsx'));
const MiningDashboard = lazy(() => import('./pages/features/admin/MiningDashboard.tsx'));
const MiningPoolSelector = lazy(() => import('./pages/MiningPoolSelector.tsx'));
const MissionControl = lazy(() => import('./pages/MissionControl.tsx'));
const MissionsSection = lazy(() => import('./pages/mission-control/MissionsSection.tsx'));
const Mobile = lazy(() => import('./pages/Mobile.tsx'));
const MobileApp = lazy(() => import('./pages/MobileApp.tsx'));
const MobileGaming = lazy(() => import('./pages/MobileGaming.tsx'));
const MobileHome = lazy(() => import('./pages/MobileHome.tsx'));
const MobileMenu = lazy(() => import('./pages/MobileMenu.tsx'));
const MobileMessages = lazy(() => import('./pages/MobileMessages.tsx'));
const MobileNotifications = lazy(() => import('./pages/MobileNotifications.tsx'));
const MobileProfile = lazy(() => import('./pages/features/user/MobileProfile.tsx'));
const MobileSearch = lazy(() => import('./pages/MobileSearch.tsx'));
const MobileSettings = lazy(() => import('./pages/features/user/MobileSettings.tsx'));
const MobileShop = lazy(() => import('./pages/features/marketplace/MobileShop.tsx'));
const MobileStreaming = lazy(() => import('./pages/features/content/MobileStreaming.tsx'));
const MobileTrading = lazy(() => import('./pages/MobileTrading.tsx'));
const MobileWallet = lazy(() => import('./pages/features/wallet/MobileWallet.tsx'));
const ModerationDashboard = lazy(() => import('./pages/features/admin/ModerationDashboard.tsx'));
const Monetization = lazy(() => import('./pages/Monetization.tsx'));
const MoodTracker = lazy(() => import('./pages/MoodTracker.tsx'));
const MortgageCalculator = lazy(() => import('./pages/MortgageCalculator.tsx'));
const MovieCatalog = lazy(() => import('./pages/MovieCatalog.tsx'));
const MovieDetail = lazy(() => import('./pages/MovieDetail.tsx'));
const MultiModelSelector = lazy(() => import('./pages/MultiModelSelector.tsx'));
const MultiSelectForm = lazy(() => import('./pages/MultiSelectForm.tsx'));
const MultiplayerLobby = lazy(() => import('./pages/MultiplayerLobby.tsx'));
const MultivariateTesting = lazy(() => import('./pages/MultivariateTesting.tsx'));
const MusicGeneration = lazy(() => import('./pages/MusicGeneration.tsx'));
const MutualConnections = lazy(() => import('./pages/MutualConnections.tsx'));
const MutualFriends = lazy(() => import('./pages/MutualFriends.tsx'));
const MyLearning = lazy(() => import('./pages/features/education/MyLearning.tsx'));
const MyTrips = lazy(() => import('./pages/MyTrips.tsx'));
const NFTGallery = lazy(() => import('./pages/features/gaming/NFTGallery.tsx'));
const NFTMinting = lazy(() => import('./pages/features/gaming/NFTMinting.tsx'));
const NFTWallet = lazy(() => import('./pages/features/gaming/NFTWallet.tsx'));
const NLPTools = lazy(() => import('./pages/NLPTools.tsx'));
const NSFWFeed = lazy(() => import('./pages/features/social/NSFWFeed.tsx'));
const NSFWPlatform = lazy(() => import('./pages/NSFWPlatform.tsx'));
const NarrativeEngine = lazy(() => import('./pages/NarrativeEngine.tsx'));
const NetWorthTracker = lazy(() => import('./pages/NetWorthTracker.tsx'));
const NetworkGraph = lazy(() => import('./pages/NetworkGraph.tsx'));
const NetworkHealth = lazy(() => import('./pages/NetworkHealth.tsx'));
const NetworkStatistics = lazy(() => import('./pages/features/analytics/NetworkStatistics.tsx'));
const NotFound = lazy(() => import('./pages/core/NotFound.tsx'));
const NotesApp = lazy(() => import('./pages/NotesApp.tsx'));
const NotificationCenter = lazy(() => import('./pages/NotificationCenter.tsx'));
const NotificationHistory = lazy(() => import('./pages/NotificationHistory.tsx'));
const NotificationIntelligence = lazy(() => import('./pages/NotificationIntelligence.tsx'));
const NotificationPreferences = lazy(() => import('./pages/NotificationPreferences.tsx'));
const NotificationSettings = lazy(() => import('./pages/features/user/NotificationSettings.tsx'));
const Notifications = lazy(() => import('./pages/wave2/Notifications.tsx'));
const NotificationsCenter = lazy(() => import('./pages/NotificationsCenter.tsx'));
const NotificationsHub = lazy(() => import('./pages/NotificationsHub.tsx'));
const NumberInputForm = lazy(() => import('./pages/NumberInputForm.tsx'));
const NutritionTracker = lazy(() => import('./pages/NutritionTracker.tsx'));
const OAuthProviders = lazy(() => import('./pages/OAuthProviders.tsx'));
const OfferManagement = lazy(() => import('./pages/OfferManagement.tsx'));
const Onboarding = lazy(() => import('./pages/Onboarding.tsx'));
const OnboardingTutorial = lazy(() => import('./pages/OnboardingTutorial.tsx'));
const OpportunitiesSection = lazy(() => import('./pages/mission-control/OpportunitiesSection.tsx'));
const OptionsTrading = lazy(() => import('./pages/OptionsTrading.tsx'));
const OracleNetwork = lazy(() => import('./pages/OracleNetwork.tsx'));
const OrderBook = lazy(() => import('./pages/features/trading/OrderBook.tsx'));
const OrderConfirmation = lazy(() => import('./pages/features/trading/OrderConfirmation.tsx'));
const OrderHistory = lazy(() => import('./pages/features/trading/OrderHistory.tsx'));
const OrderPlacement = lazy(() => import('./pages/features/trading/OrderPlacement.tsx'));
const OrderTracking = lazy(() => import('./pages/features/trading/OrderTracking.tsx'));
const OrderTypes = lazy(() => import('./pages/features/trading/OrderTypes.tsx'));
const OrganizationSettings = lazy(() => import('./pages/features/user/OrganizationSettings.tsx'));
const P2EShop = lazy(() => import('./pages/features/marketplace/P2EShop.tsx'));
const Pagination = lazy(() => import('./pages/Pagination.tsx'));
const PasswordInputForm = lazy(() => import('./pages/PasswordInputForm.tsx'));
const PasswordReset = lazy(() => import('./pages/PasswordReset.tsx'));
const PayPalIntegration = lazy(() => import('./pages/PayPalIntegration.tsx'));
const PaymentConfirmation = lazy(() => import('./pages/PaymentConfirmation.tsx'));
const PaymentInfra = lazy(() => import('./pages/PaymentInfra.tsx'));
const PaymentMethods = lazy(() => import('./pages/PaymentMethods.tsx'));
const PaymentSetup = lazy(() => import('./pages/PaymentSetup.tsx'));
const Payments = lazy(() => import('./pages/wave4/Payments.tsx'));
const PayoutDashboard = lazy(() => import('./pages/features/admin/PayoutDashboard.tsx'));
const PayoutManagement = lazy(() => import('./pages/PayoutManagement.tsx'));
const PerformanceMetrics = lazy(() => import('./pages/PerformanceMetrics.tsx'));
const PerformanceTuning = lazy(() => import('./pages/PerformanceTuning.tsx'));
const PermissionManagement = lazy(() => import('./pages/PermissionManagement.tsx'));
const PerpetualFutures = lazy(() => import('./pages/PerpetualFutures.tsx'));
const PersonaBuilder = lazy(() => import('./pages/PersonaBuilder.tsx'));
const Phase1Dashboard = lazy(() => import('./pages/features/admin/Phase1Dashboard.tsx'));
const Phase20Hub = lazy(() => import('./pages/phase20/Phase20Hub.tsx'));
const Phase2to4Dashboard = lazy(() => import('./pages/features/admin/Phase2to4Dashboard.tsx'));
const PhoneVerification = lazy(() => import('./pages/PhoneVerification.tsx'));
const PlatformMap = lazy(() => import('./pages/PlatformMap.tsx'));
const PlatformStatus = lazy(() => import('./pages/features/analytics/PlatformStatus.tsx'));
const PlaylistManagement = lazy(() => import('./pages/features/gaming/PlaylistManagement.tsx'));
const PlaylistManager = lazy(() => import('./pages/features/gaming/PlaylistManager.tsx'));
const PodcastStudio = lazy(() => import('./pages/features/content/PodcastStudio.tsx'));
const PolicyManagement = lazy(() => import('./pages/PolicyManagement.tsx'));
const PoolPerformance = lazy(() => import('./pages/PoolPerformance.tsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.tsx'));
const PortfolioComparison = lazy(() => import('./pages/PortfolioComparison.tsx'));
const PortfolioOptimization = lazy(() => import('./pages/PortfolioOptimization.tsx'));
const PortfolioOverview = lazy(() => import('./pages/PortfolioOverview.tsx'));
const PortfolioRebalance = lazy(() => import('./pages/PortfolioRebalance.tsx'));
const PortfolioTracker = lazy(() => import('./pages/PortfolioTracker.tsx'));
const PortfolioTracking = lazy(() => import('./pages/PortfolioTracking.tsx'));
const PositionManagement = lazy(() => import('./pages/PositionManagement.tsx'));
const PowerUserTools = lazy(() => import('./pages/features/user/PowerUserTools.tsx'));
const PracticeSessions = lazy(() => import('./pages/PracticeSessions.tsx'));
const PredictiveAnalytics = lazy(() => import('./pages/features/analytics/PredictiveAnalytics.tsx'));
const PredictiveModels = lazy(() => import('./pages/PredictiveModels.tsx'));
const PredictiveSystems = lazy(() => import('./pages/PredictiveSystems.tsx'));
const PreferencesSetup = lazy(() => import('./pages/PreferencesSetup.tsx'));
const PremiumFeatures = lazy(() => import('./pages/PremiumFeatures.tsx'));
const PresentationWithChat = lazy(() => import('./pages/PresentationWithChat.tsx'));
const PriceAlerts = lazy(() => import('./pages/PriceAlerts.tsx'));
const Pricing = lazy(() => import('./pages/Pricing.tsx'));
const PricingEngine = lazy(() => import('./pages/PricingEngine.tsx'));
const PricingManagement = lazy(() => import('./pages/PricingManagement.tsx'));
const PricingRules = lazy(() => import('./pages/PricingRules.tsx'));
const PriorityMatrix = lazy(() => import('./pages/PriorityMatrix.tsx'));
const PrivacyMixer = lazy(() => import('./pages/PrivacyMixer.tsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'));
const PrivacySettings = lazy(() => import('./pages/features/user/PrivacySettings.tsx'));
const PrivacyVault = lazy(() => import('./pages/PrivacyVault.tsx'));
const ProductApproval = lazy(() => import('./pages/features/marketplace/ProductApproval.tsx'));
const ProductBrain = lazy(() => import('./pages/features/marketplace/ProductBrain.tsx'));
const ProductCatalog = lazy(() => import('./pages/features/marketplace/ProductCatalog.tsx'));
const ProductComparison = lazy(() => import('./pages/features/marketplace/ProductComparison.tsx'));
const ProductDetail = lazy(() => import('./pages/features/marketplace/ProductDetail.tsx'));
const ProductListing = lazy(() => import('./pages/features/marketplace/ProductListing.tsx'));
const ProductListings = lazy(() => import('./pages/features/marketplace/ProductListings.tsx'));
const ProductReviews = lazy(() => import('./pages/features/marketplace/ProductReviews.tsx'));
const ProductionArchitecture = lazy(() => import('./pages/features/marketplace/ProductionArchitecture.tsx'));
const Profile = lazy(() => import('./pages/features/user/Profile.tsx'));
const ProfileCompletion = lazy(() => import('./pages/features/user/ProfileCompletion.tsx'));
const ProfileCreation = lazy(() => import('./pages/features/user/ProfileCreation.tsx'));
const ProfileCustomization = lazy(() => import('./pages/features/user/ProfileCustomization.tsx'));
const ProfileDashboard = lazy(() => import('./pages/features/admin/ProfileDashboard.tsx'));
const ProfileEdit = lazy(() => import('./pages/features/user/ProfileEdit.tsx'));
const ProfilePicture = lazy(() => import('./pages/features/user/ProfilePicture.tsx'));
const ProfilePreview = lazy(() => import('./pages/features/user/ProfilePreview.tsx'));
const ProfileView = lazy(() => import('./pages/features/user/ProfileView.tsx'));
const ProfileWallet = lazy(() => import('./pages/features/wallet/ProfileWallet.tsx'));
const Profitability = lazy(() => import('./pages/Profitability.tsx'));
const ProgressBar = lazy(() => import('./pages/ProgressBar.tsx'));
const ProgressTracking = lazy(() => import('./pages/ProgressTracking.tsx'));
const ProjectBoard = lazy(() => import('./pages/ProjectBoard.tsx'));
const ProjectListing = lazy(() => import('./pages/features/marketplace/ProjectListing.tsx'));
const PromotionEngine = lazy(() => import('./pages/PromotionEngine.tsx'));
const PromptBuilder = lazy(() => import('./pages/PromptBuilder.tsx'));
const ProofVault = lazy(() => import('./pages/ProofVault.tsx'));
const PropertyComparison = lazy(() => import('./pages/PropertyComparison.tsx'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail.tsx'));
const PropertyListing = lazy(() => import('./pages/features/marketplace/PropertyListing.tsx'));
const PropertyTransfer = lazy(() => import('./pages/PropertyTransfer.tsx'));
const ProtocolLayer = lazy(() => import('./pages/ProtocolLayer.tsx'));
const PublishingQueue = lazy(() => import('./pages/PublishingQueue.tsx'));
const PublishingSchedule = lazy(() => import('./pages/PublishingSchedule.tsx'));
const PushNotifications = lazy(() => import('./pages/PushNotifications.tsx'));
const QRCodeGenerator = lazy(() => import('./pages/QRCodeGenerator.tsx'));
const QuantumComputing = lazy(() => import('./pages/QuantumComputing.tsx'));
const QuantumSafe = lazy(() => import('./pages/QuantumSafe.tsx'));
const QuickActions = lazy(() => import('./pages/QuickActions.tsx'));
const QuickStats = lazy(() => import('./pages/features/analytics/QuickStats.tsx'));
const QuizBuilder = lazy(() => import('./pages/QuizBuilder.tsx'));
const RFMAnalysis = lazy(() => import('./pages/RFMAnalysis.tsx'));
const RFQSystem = lazy(() => import('./pages/RFQSystem.tsx'));
const RadioButtonForm = lazy(() => import('./pages/RadioButtonForm.tsx'));
const RateLimitConfig = lazy(() => import('./pages/RateLimitConfig.tsx'));
const RateLimitDashboard = lazy(() => import('./pages/features/admin/RateLimitDashboard.tsx'));
const RateLimitError = lazy(() => import('./pages/RateLimitError.tsx'));
const RateLimiting = lazy(() => import('./pages/RateLimiting.tsx'));
const RatingSystem = lazy(() => import('./pages/RatingSystem.tsx'));
const ReadReceipts = lazy(() => import('./pages/ReadReceipts.tsx'));
const RealTimeGameEngine = lazy(() => import('./pages/features/gaming/RealTimeGameEngine.tsx'));
const RealTimeMonitoring = lazy(() => import('./pages/RealTimeMonitoring.tsx'));
const RealTimeStreaming = lazy(() => import('./pages/features/content/RealTimeStreaming.tsx'));
const RebalancingTools = lazy(() => import('./pages/RebalancingTools.tsx'));
const ReceiptDownload = lazy(() => import('./pages/ReceiptDownload.tsx'));
const ReceiveCrypto = lazy(() => import('./pages/features/wallet/ReceiveCrypto.tsx'));
const RecentActivity = lazy(() => import('./pages/RecentActivity.tsx'));
const Recommendations = lazy(() => import('./pages/Recommendations.tsx'));
const RecommendationsFeed = lazy(() => import('./pages/features/social/RecommendationsFeed.tsx'));
const RecommendedMatches = lazy(() => import('./pages/RecommendedMatches.tsx'));
const Reels = lazy(() => import('./pages/Reels.tsx'));
const RefactoringTools = lazy(() => import('./pages/RefactoringTools.tsx'));
const Referrals = lazy(() => import('./pages/Referrals.tsx'));
const RefundRequests = lazy(() => import('./pages/RefundRequests.tsx'));
const RegionalSettings = lazy(() => import('./pages/features/user/RegionalSettings.tsx'));
const Reminders = lazy(() => import('./pages/Reminders.tsx'));
const ReportDialog = lazy(() => import('./pages/features/analytics/ReportDialog.tsx'));
const ReportUser = lazy(() => import('./pages/features/analytics/ReportUser.tsx'));
const ReportsDashboard = lazy(() => import('./pages/features/admin/ReportsDashboard.tsx'));
const Reputation = lazy(() => import('./pages/Reputation.tsx'));
const ReputationSection = lazy(() => import('./pages/mission-control/ReputationSection.tsx'));
const ReputationSystem = lazy(() => import('./pages/ReputationSystem.tsx'));
const ResourceAllocation = lazy(() => import('./pages/ResourceAllocation.tsx'));
const ResourceLibrary = lazy(() => import('./pages/ResourceLibrary.tsx'));
const ResponseTime = lazy(() => import('./pages/ResponseTime.tsx'));
const Retention = lazy(() => import('./pages/Retention.tsx'));
const RetentionAnalytics = lazy(() => import('./pages/features/analytics/RetentionAnalytics.tsx'));
const RetentionEngine = lazy(() => import('./pages/RetentionEngine.tsx'));
const RetirementPlanner = lazy(() => import('./pages/RetirementPlanner.tsx'));
const ReturnManagement = lazy(() => import('./pages/ReturnManagement.tsx'));
const ReturnsRefunds = lazy(() => import('./pages/ReturnsRefunds.tsx'));
const RevenueTracking = lazy(() => import('./pages/RevenueTracking.tsx'));
const ReviewModeration = lazy(() => import('./pages/features/admin/ReviewModeration.tsx'));
const Reviews = lazy(() => import('./pages/Reviews.tsx'));
const ReviewsRatings = lazy(() => import('./pages/ReviewsRatings.tsx'));
const RewardSystem = lazy(() => import('./pages/RewardSystem.tsx'));
const RewardsMonitoring = lazy(() => import('./pages/RewardsMonitoring.tsx'));
const RewardsTracking = lazy(() => import('./pages/RewardsTracking.tsx'));
const RiskAnalysis = lazy(() => import('./pages/RiskAnalysis.tsx'));
const RiskManagement = lazy(() => import('./pages/RiskManagement.tsx'));
const Roadmap = lazy(() => import('./pages/Roadmap.tsx'));
const RoadmapView = lazy(() => import('./pages/RoadmapView.tsx'));
const RoleBasedAccess = lazy(() => import('./pages/RoleBasedAccess.tsx'));
const RoleManagement = lazy(() => import('./pages/RoleManagement.tsx'));
const SDKDownload = lazy(() => import('./pages/SDKDownload.tsx'));
const SDKManagement = lazy(() => import('./pages/SDKManagement.tsx'));
const SEOOptimizer = lazy(() => import('./pages/SEOOptimizer.tsx'));
const SKY444CentralBank = lazy(() => import('./pages/SKY444CentralBank.tsx'));
const SMSCampaigns = lazy(() => import('./pages/SMSCampaigns.tsx'));
const SMSIntegration = lazy(() => import('./pages/SMSIntegration.tsx'));
const SMSTemplates = lazy(() => import('./pages/SMSTemplates.tsx'));
const SMTPSettings = lazy(() => import('./pages/features/user/SMTPSettings.tsx'));
const SOC2 = lazy(() => import('./pages/SOC2.tsx'));
const SSLCertificates = lazy(() => import('./pages/SSLCertificates.tsx'));
const SSO = lazy(() => import('./pages/SSO.tsx'));
const SalesAnalytics = lazy(() => import('./pages/features/analytics/SalesAnalytics.tsx'));
const SalesforceIntegration = lazy(() => import('./pages/SalesforceIntegration.tsx'));
const SatisfactionSurvey = lazy(() => import('./pages/SatisfactionSurvey.tsx'));
const SavedProperties = lazy(() => import('./pages/SavedProperties.tsx'));
const SavedSearches = lazy(() => import('./pages/SavedSearches.tsx'));
const SavingsGoals = lazy(() => import('./pages/SavingsGoals.tsx'));
const ScheduledJobs = lazy(() => import('./pages/ScheduledJobs.tsx'));
const ScheduledReports = lazy(() => import('./pages/features/analytics/ScheduledReports.tsx'));
const School = lazy(() => import('./pages/features/education/School.tsx'));
const SchoolCertificate = lazy(() => import('./pages/features/education/SchoolCertificate.tsx'));
const SchoolCourse = lazy(() => import('./pages/features/education/SchoolCourse.tsx'));
const SchoolDashboard = lazy(() => import('./pages/features/education/SchoolDashboard.tsx'));
const SchoolLesson = lazy(() => import('./pages/features/education/SchoolLesson.tsx'));
const SchoolQuiz = lazy(() => import('./pages/features/education/SchoolQuiz.tsx'));
const Search = lazy(() => import('./pages/Search.tsx'));
const SearchAnalytics = lazy(() => import('./pages/features/analytics/SearchAnalytics.tsx'));
const SearchHistory = lazy(() => import('./pages/SearchHistory.tsx'));
const SearchResults = lazy(() => import('./pages/SearchResults.tsx'));
const SearchSuggestions = lazy(() => import('./pages/SearchSuggestions.tsx'));
const SeasonalEvents = lazy(() => import('./pages/SeasonalEvents.tsx'));
const Security = lazy(() => import('./pages/wave4/Security.tsx'));
const SecurityAudit = lazy(() => import('./pages/SecurityAudit.tsx'));
const SecurityCompliance = lazy(() => import('./pages/SecurityCompliance.tsx'));
const SecurityDashboard = lazy(() => import('./pages/features/admin/SecurityDashboard.tsx'));
const SecuritySettings = lazy(() => import('./pages/features/user/SecuritySettings.tsx'));
const SegmentationAnalysis = lazy(() => import('./pages/SegmentationAnalysis.tsx'));
const SelectDropdownForm = lazy(() => import('./pages/SelectDropdownForm.tsx'));
const SelfHealingInfra = lazy(() => import('./pages/SelfHealingInfra.tsx'));
const SellerDashboard = lazy(() => import('./pages/features/admin/SellerDashboard.tsx'));
const SellerProfile = lazy(() => import('./pages/features/user/SellerProfile.tsx'));
const SendCrypto = lazy(() => import('./pages/features/wallet/SendCrypto.tsx'));
const SentimentPipeline = lazy(() => import('./pages/SentimentPipeline.tsx'));
const ServerHealth = lazy(() => import('./pages/ServerHealth.tsx'));
const ServerInstaller = lazy(() => import('./pages/ServerInstaller.tsx'));
const ServerStatus = lazy(() => import('./pages/features/analytics/ServerStatus.tsx'));
const Settings = lazy(() => import('./pages/features/user/Settings.tsx'));
const SettingsDialog = lazy(() => import('./pages/features/user/SettingsDialog.tsx'));
const SetupWizard = lazy(() => import('./pages/SetupWizard.tsx'));
const ShadowIdentity = lazy(() => import('./pages/ShadowIdentity.tsx'));
const ShadowRelay = lazy(() => import('./pages/ShadowRelay.tsx'));
const ShareDialog = lazy(() => import('./pages/ShareDialog.tsx'));
const Shares = lazy(() => import('./pages/Shares.tsx'));
const Sharing = lazy(() => import('./pages/Sharing.tsx'));
const ShippingManagement = lazy(() => import('./pages/ShippingManagement.tsx'));
const ShoppingCart = lazy(() => import('./pages/features/marketplace/ShoppingCart.tsx'));
const SidebarNavigation = lazy(() => import('./pages/SidebarNavigation.tsx'));
const SignUp = lazy(() => import('./pages/SignUp.tsx'));
const SignUpFlow = lazy(() => import('./pages/SignUpFlow.tsx'));
const SignUp_old = lazy(() => import('./pages/SignUp_old.tsx'));
const Signin = lazy(() => import('./pages/Signin.tsx'));
const SituationRoom = lazy(() => import('./pages/SituationRoom.tsx'));
const SkillBadges = lazy(() => import('./pages/SkillBadges.tsx'));
const SkySchool = lazy(() => import('./pages/features/education/SkySchool.tsx'));
const SkySchoolAI = lazy(() => import('./pages/features/education/SkySchoolAI.tsx'));
const SkySchoolQuiz = lazy(() => import('./pages/features/education/SkySchoolQuiz.tsx'));
const SkyStore = lazy(() => import('./pages/features/marketplace/SkyStore.tsx'));
const SlackIntegration = lazy(() => import('./pages/SlackIntegration.tsx'));
const SleepTracking = lazy(() => import('./pages/SleepTracking.tsx'));
const SlippageProtection = lazy(() => import('./pages/SlippageProtection.tsx'));
const SmartContractAudit = lazy(() => import('./pages/SmartContractAudit.tsx'));
const SmartContractViewer = lazy(() => import('./pages/SmartContractViewer.tsx'));
const SmartContracts = lazy(() => import('./pages/SmartContracts.tsx'));
const SocialAnalytics = lazy(() => import('./pages/features/social/SocialAnalytics.tsx'));
const SocialEvents = lazy(() => import('./pages/features/social/SocialEvents.tsx'));
const SocialFeed = lazy(() => import('./pages/features/social/SocialFeed.tsx'));
const SocialFeedV2 = lazy(() => import('./pages/features/social/SocialFeedV2.tsx'));
const SocialGraph = lazy(() => import('./pages/features/social/SocialGraph.tsx'));
const SocialMedia = lazy(() => import('./pages/features/social/SocialMedia.tsx'));
const SocialMediaCampaigns = lazy(() => import('./pages/features/social/SocialMediaCampaigns.tsx'));
const SolanaValidatorSetup = lazy(() => import('./pages/SolanaValidatorSetup.tsx'));
const SortOptions = lazy(() => import('./pages/SortOptions.tsx'));
const SpeechToText = lazy(() => import('./pages/SpeechToText.tsx'));
const SpinWheel = lazy(() => import('./pages/SpinWheel.tsx'));
const Sponsorships = lazy(() => import('./pages/Sponsorships.tsx'));
const StakeDelegation = lazy(() => import('./pages/StakeDelegation.tsx'));
const StakingDashboard = lazy(() => import('./pages/features/admin/StakingDashboard.tsx'));
const StakingHub = lazy(() => import('./pages/StakingHub.tsx'));
const StakingOptions = lazy(() => import('./pages/StakingOptions.tsx'));
const StakingPortal = lazy(() => import('./pages/StakingPortal.tsx'));
const StartupSection = lazy(() => import('./pages/mission-control/StartupSection.tsx'));
const StatisticsPanel = lazy(() => import('./pages/features/admin/StatisticsPanel.tsx'));
const Status = lazy(() => import('./pages/features/analytics/Status.tsx'));
const StepperWizard = lazy(() => import('./pages/StepperWizard.tsx'));
const StockChart = lazy(() => import('./pages/features/analytics/StockChart.tsx'));
const StockSearch = lazy(() => import('./pages/StockSearch.tsx'));
const Stories = lazy(() => import('./pages/Stories.tsx'));
const StreamAnalytics = lazy(() => import('./pages/features/analytics/StreamAnalytics.tsx'));
const StreamClip = lazy(() => import('./pages/features/content/StreamClip.tsx'));
const StreamGifting = lazy(() => import('./pages/features/content/StreamGifting.tsx'));
const StreamingDashboard = lazy(() => import('./pages/features/admin/StreamingDashboard.tsx'));
const StripeCheckout = lazy(() => import('./pages/StripeCheckout.tsx'));
const StripeIntegration = lazy(() => import('./pages/StripeIntegration.tsx'));
const StudentProgress = lazy(() => import('./pages/StudentProgress.tsx'));
const StyleSelector = lazy(() => import('./pages/StyleSelector.tsx'));
const SubscriberManagement = lazy(() => import('./pages/SubscriberManagement.tsx'));
const SubscriptionManagement = lazy(() => import('./pages/SubscriptionManagement.tsx'));
const SubscriptionPlans = lazy(() => import('./pages/SubscriptionPlans.tsx'));
const SubscriptionSetup = lazy(() => import('./pages/SubscriptionSetup.tsx'));
const Subscriptions = lazy(() => import('./pages/Subscriptions.tsx'));
const SuccessDialog = lazy(() => import('./pages/SuccessDialog.tsx'));
const SuccessScreen = lazy(() => import('./pages/SuccessScreen.tsx'));
const SupportMetrics = lazy(() => import('./pages/SupportMetrics.tsx'));
const SupportTicket = lazy(() => import('./pages/SupportTicket.tsx'));
const SwapInterface = lazy(() => import('./pages/features/trading/SwapInterface.tsx'));
const SwipeInterface = lazy(() => import('./pages/SwipeInterface.tsx'));
const Synthetics = lazy(() => import('./pages/Synthetics.tsx'));
const SystemArchitecture = lazy(() => import('./pages/SystemArchitecture.tsx'));
const SystemLogs = lazy(() => import('./pages/SystemLogs.tsx'));
const SystemMonitoring = lazy(() => import('./pages/SystemMonitoring.tsx'));
const SystemObservability = lazy(() => import('./pages/SystemObservability.tsx'));
const SystemSettings = lazy(() => import('./pages/features/user/SystemSettings.tsx'));
const SystemStatus = lazy(() => import('./pages/features/analytics/SystemStatus.tsx'));
const TabsNavigation = lazy(() => import('./pages/TabsNavigation.tsx'));
const TaskAutomation = lazy(() => import('./pages/TaskAutomation.tsx'));
const TaskDetail = lazy(() => import('./pages/TaskDetail.tsx'));
const TaskList = lazy(() => import('./pages/TaskList.tsx'));
const TaxDocumentation = lazy(() => import('./pages/features/api/TaxDocumentation.tsx'));
const TaxPlanning = lazy(() => import('./pages/TaxPlanning.tsx'));
const TaxReporting = lazy(() => import('./pages/features/analytics/TaxReporting.tsx'));
const TaxReports = lazy(() => import('./pages/features/analytics/TaxReports.tsx'));
const TeachingOpportunities = lazy(() => import('./pages/TeachingOpportunities.tsx'));
const TeamManagement = lazy(() => import('./pages/TeamManagement.tsx'));
const TeamWorkspace = lazy(() => import('./pages/TeamWorkspace.tsx'));
const TechnicalIndicators = lazy(() => import('./pages/TechnicalIndicators.tsx'));
const TelegramIntegration = lazy(() => import('./pages/TelegramIntegration.tsx'));
const TemplateLibrary = lazy(() => import('./pages/TemplateLibrary.tsx'));
const TermsAcceptance = lazy(() => import('./pages/TermsAcceptance.tsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.tsx'));
const TestingFramework = lazy(() => import('./pages/TestingFramework.tsx'));
const TextInputForm = lazy(() => import('./pages/TextInputForm.tsx'));
const TextToSpeech = lazy(() => import('./pages/TextToSpeech.tsx'));
const TextTools = lazy(() => import('./pages/TextTools.tsx'));
const ThemeSettings = lazy(() => import('./pages/features/user/ThemeSettings.tsx'));
const ThreadManagement = lazy(() => import('./pages/ThreadManagement.tsx'));
const TicketAssignment = lazy(() => import('./pages/TicketAssignment.tsx'));
const TicketDetail = lazy(() => import('./pages/TicketDetail.tsx'));
const TicketQueue = lazy(() => import('./pages/TicketQueue.tsx'));
const TierComparison = lazy(() => import('./pages/TierComparison.tsx'));
const TimeInputForm = lazy(() => import('./pages/TimeInputForm.tsx'));
const TimePickerDialog = lazy(() => import('./pages/TimePickerDialog.tsx'));
const TimeTracking = lazy(() => import('./pages/TimeTracking.tsx'));
const TimelineView = lazy(() => import('./pages/TimelineView.tsx'));
const TimeoutError = lazy(() => import('./pages/TimeoutError.tsx'));
const TipJar = lazy(() => import('./pages/TipJar.tsx'));
const ToastNotifications = lazy(() => import('./pages/ToastNotifications.tsx'));
const TodaySection = lazy(() => import('./pages/mission-control/TodaySection.tsx'));
const TodoList = lazy(() => import('./pages/TodoList.tsx'));
const ToggleSwitchForm = lazy(() => import('./pages/ToggleSwitchForm.tsx'));
const TokenDashboard = lazy(() => import('./pages/features/admin/TokenDashboard.tsx'));
const TokenGovernance = lazy(() => import('./pages/TokenGovernance.tsx'));
const TokenInformation = lazy(() => import('./pages/TokenInformation.tsx'));
const TokenMetrics = lazy(() => import('./pages/TokenMetrics.tsx'));
const TokenomicsCalculator = lazy(() => import('./pages/TokenomicsCalculator.tsx'));
const TorBridge = lazy(() => import('./pages/TorBridge.tsx'));
const TournamentBracket = lazy(() => import('./pages/features/gaming/TournamentBracket.tsx'));
const TournamentBrackets = lazy(() => import('./pages/features/gaming/TournamentBrackets.tsx'));
const Tournaments = lazy(() => import('./pages/features/gaming/Tournaments.tsx'));
const TradeHistory = lazy(() => import('./pages/features/trading/TradeHistory.tsx'));
const Trading = lazy(() => import('./pages/Trading.tsx'));
const TradingBots = lazy(() => import('./pages/TradingBots.tsx'));
const TradingHistory = lazy(() => import('./pages/TradingHistory.tsx'));
const TradingTerminal = lazy(() => import('./pages/TradingTerminal.tsx'));
const TransactionExplorer = lazy(() => import('./pages/features/wallet/TransactionExplorer.tsx'));
const TransactionHistory = lazy(() => import('./pages/features/wallet/TransactionHistory.tsx'));
const TransactionViewer = lazy(() => import('./pages/features/wallet/TransactionViewer.tsx'));
const TranscriptionManager = lazy(() => import('./pages/TranscriptionManager.tsx'));
const TranslationEnabledCommunity = lazy(() => import('./pages/TranslationEnabledCommunity.tsx'));
const TranslationEnabledSocialFeed = lazy(() => import('./pages/features/social/TranslationEnabledSocialFeed.tsx'));
const TransparencyReports = lazy(() => import('./pages/features/analytics/TransparencyReports.tsx'));
const TravelBlog = lazy(() => import('./pages/TravelBlog.tsx'));
const TravelBudget = lazy(() => import('./pages/TravelBudget.tsx'));
const TravelDocuments = lazy(() => import('./pages/features/api/TravelDocuments.tsx'));
const TravelPhotos = lazy(() => import('./pages/TravelPhotos.tsx'));
const TravelReviews = lazy(() => import('./pages/TravelReviews.tsx'));
const TravelTips = lazy(() => import('./pages/TravelTips.tsx'));
const TreasuryManagement = lazy(() => import('./pages/TreasuryManagement.tsx'));
const TrendAnalysis = lazy(() => import('./pages/TrendAnalysis.tsx'));
const Trending = lazy(() => import('./pages/Trending.tsx'));
const TrendingContent = lazy(() => import('./pages/features/content/TrendingContent.tsx'));
const TrendingItems = lazy(() => import('./pages/TrendingItems.tsx'));
const TrendingTopics = lazy(() => import('./pages/TrendingTopics.tsx'));
const TriggersActions = lazy(() => import('./pages/TriggersActions.tsx'));
const TripPlanner = lazy(() => import('./pages/TripPlanner.tsx'));
const TrumpMining = lazy(() => import('./pages/TrumpMining.tsx'));
const TrustSafetyDashboard = lazy(() => import('./pages/features/admin/TrustSafetyDashboard.tsx'));
const TrustSystem = lazy(() => import('./pages/TrustSystem.tsx'));
const TwoFactorAuth = lazy(() => import('./pages/TwoFactorAuth.tsx'));
const TwoFactorSetup = lazy(() => import('./pages/TwoFactorSetup.tsx'));
const TypingIndicators = lazy(() => import('./pages/TypingIndicators.tsx'));
const UnhiddenInterface = lazy(() => import('./pages/UnhiddenInterface.tsx'));
const UnhiddenMode = lazy(() => import('./pages/UnhiddenMode.tsx'));
const UnifiedFeed = lazy(() => import('./pages/features/social/UnifiedFeed.tsx'));
const UnifiedIdentity = lazy(() => import('./pages/UnifiedIdentity.tsx'));
const UnifiedMessaging = lazy(() => import('./pages/UnifiedMessaging.tsx'));
const UnifiedPaymentLedger = lazy(() => import('./pages/UnifiedPaymentLedger.tsx'));
const UnifiedPlatformDashboard = lazy(() => import('./pages/features/admin/UnifiedPlatformDashboard.tsx'));
const UnifiedWallet = lazy(() => import('./pages/features/wallet/UnifiedWallet.tsx'));
const UniversalSearch = lazy(() => import('./pages/UniversalSearch.tsx'));
const UpdatedLandingPage = lazy(() => import('./pages/UpdatedLandingPage.tsx'));
const UpgradeDowngradePlan = lazy(() => import('./pages/UpgradeDowngradePlan.tsx'));
const Upscaling = lazy(() => import('./pages/Upscaling.tsx'));
const UserActivity = lazy(() => import('./pages/features/user/UserActivity.tsx'));
const UserBehavior = lazy(() => import('./pages/features/user/UserBehavior.tsx'));
const UserBio = lazy(() => import('./pages/features/user/UserBio.tsx'));
const UserDirectory = lazy(() => import('./pages/features/user/UserDirectory.tsx'));
const UserDiscovery = lazy(() => import('./pages/features/user/UserDiscovery.tsx'));
const UserManagement = lazy(() => import('./pages/features/user/UserManagement.tsx'));
const UserMentions = lazy(() => import('./pages/features/user/UserMentions.tsx'));
const UserOnboarding = lazy(() => import('./pages/features/user/UserOnboarding.tsx'));
const UserPermissions = lazy(() => import('./pages/features/user/UserPermissions.tsx'));
const UserProfile = lazy(() => import('./pages/features/user/UserProfile.tsx'));
const UserProfiles = lazy(() => import('./pages/features/user/UserProfiles.tsx'));
const UserReputation = lazy(() => import('./pages/features/user/UserReputation.tsx'));
const UserSearch = lazy(() => import('./pages/features/user/UserSearch.tsx'));
const UserStats = lazy(() => import('./pages/features/analytics/UserStats.tsx'));
const UserSuggestions = lazy(() => import('./pages/features/user/UserSuggestions.tsx'));
const UserTimeline = lazy(() => import('./pages/features/user/UserTimeline.tsx'));
const VODArchive = lazy(() => import('./pages/VODArchive.tsx'));
const ValidatorPerformance = lazy(() => import('./pages/ValidatorPerformance.tsx'));
const ValidatorSetup = lazy(() => import('./pages/ValidatorSetup.tsx'));
const VendorAnalytics = lazy(() => import('./pages/features/analytics/VendorAnalytics.tsx'));
const VendorDirectory = lazy(() => import('./pages/VendorDirectory.tsx'));
const VendorOnboarding = lazy(() => import('./pages/VendorOnboarding.tsx'));
const VendorPerformance = lazy(() => import('./pages/VendorPerformance.tsx'));
const VendorVerification = lazy(() => import('./pages/VendorVerification.tsx'));
const VenueManagement = lazy(() => import('./pages/VenueManagement.tsx'));
const Verification = lazy(() => import('./pages/Verification.tsx'));
const VerificationSteps = lazy(() => import('./pages/VerificationSteps.tsx'));
const VerificationSystem = lazy(() => import('./pages/VerificationSystem.tsx'));
const VersionManagement = lazy(() => import('./pages/VersionManagement.tsx'));
const VestingSchedule = lazy(() => import('./pages/VestingSchedule.tsx'));
const VideoArea = lazy(() => import('./pages/features/content/VideoArea.tsx'));
const VideoCall = lazy(() => import('./pages/features/content/VideoCall.tsx'));
const VideoChat = lazy(() => import('./pages/features/content/VideoChat.tsx'));
const VideoEditor = lazy(() => import('./pages/features/content/VideoEditor.tsx'));
const VideoPlayer = lazy(() => import('./pages/features/gaming/VideoPlayer.tsx'));
const VideoTools = lazy(() => import('./pages/features/content/VideoTools.tsx'));
const VideoTutorials = lazy(() => import('./pages/features/content/VideoTutorials.tsx'));
const VideoUpload = lazy(() => import('./pages/features/content/VideoUpload.tsx'));
const VideoUploader = lazy(() => import('./pages/features/content/VideoUploader.tsx'));
const ViewerMetrics = lazy(() => import('./pages/ViewerMetrics.tsx'));
const VirtualTour = lazy(() => import('./pages/VirtualTour.tsx'));
const VoiceCloning = lazy(() => import('./pages/VoiceCloning.tsx'));
const VoiceCommands = lazy(() => import('./pages/VoiceCommands.tsx'));
const VoiceCommandsRegistry = lazy(() => import('./pages/VoiceCommandsRegistry.tsx'));
const VoiceMessages = lazy(() => import('./pages/VoiceMessages.tsx'));
const WalkthroughPage = lazy(() => import('./pages/WalkthroughPage.tsx'));
const Wallet = lazy(() => import('./pages/features/wallet/Wallet.tsx'));
const WalletConnect = lazy(() => import('./pages/features/wallet/WalletConnect.tsx'));
const WalletIntegration = lazy(() => import('./pages/features/wallet/WalletIntegration.tsx'));
const WalletOverview = lazy(() => import('./pages/features/wallet/WalletOverview.tsx'));
const WarningDialog = lazy(() => import('./pages/WarningDialog.tsx'));
const WatchEarn = lazy(() => import('./pages/WatchEarn.tsx'));
const WatchList = lazy(() => import('./pages/WatchList.tsx'));
const WealthSimulator = lazy(() => import('./pages/WealthSimulator.tsx'));
const Web3Auth = lazy(() => import('./pages/Web3Auth.tsx'));
const WebhookManagement = lazy(() => import('./pages/WebhookManagement.tsx'));
const WebhookManager = lazy(() => import('./pages/WebhookManager.tsx'));
const Webhooks = lazy(() => import('./pages/Webhooks.tsx'));
const WelcomeScreen = lazy(() => import('./pages/WelcomeScreen.tsx'));
const WhaleMonitor = lazy(() => import('./pages/WhaleMonitor.tsx'));
const WhitelistManagement = lazy(() => import('./pages/WhitelistManagement.tsx'));
const WishlistManagement = lazy(() => import('./pages/WishlistManagement.tsx'));
const WorkflowAutomation = lazy(() => import('./pages/WorkflowAutomation.tsx'));
const WorkflowBuilder = lazy(() => import('./pages/WorkflowBuilder.tsx'));
const WorldBrain = lazy(() => import('./pages/WorldBrain.tsx'));
const WorldSimulationControl = lazy(() => import('./pages/WorldSimulationControl.tsx'));
const YieldFarming = lazy(() => import('./pages/YieldFarming.tsx'));
const ZapierIntegration = lazy(() => import('./pages/ZapierIntegration.tsx'));
const ZeroKnowledgeProof = lazy(() => import('./pages/ZeroKnowledgeProof.tsx'));
const shared = lazy(() => import('./pages/mission-control/shared.tsx'));

// Loading skeleton
const LoadingFallback = () => <DashboardLayoutSkeleton />;

export default function App() {
  return (
    <ErrorBoundary>
      <TRPCProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Route path="/" component={Home} />
              <Route path="/404" component={NotFound} />
              
        <Route path="/a-b-testing" element={ABTesting} />
        <Route path="/a-b-testing-advanced" element={ABTestingAdvanced} />
        <Route path="/a-i-agent-economy" element={AIAgentEconomy} />
        <Route path="/a-i-agent-market" element={AIAgentMarket} />
        <Route path="/a-i-assistant" element={AIAssistant} />
        <Route path="/a-i-brain" element={AIBrain} />
        <Route path="/a-i-code-studio" element={AICodeStudio} />
        <Route path="/a-i-copy-studio" element={AICopyStudio} />
        <Route path="/a-i-core" element={AICore} />
        <Route path="/a-i-engineer" element={AIEngineer} />
        <Route path="/a-i-governance" element={AIGovernance} />
        <Route path="/a-i-market-agents" element={AIMarketAgents} />
        <Route path="/a-i-matchmaker" element={AIMatchmaker} />
        <Route path="/a-i-moderation-queue" element={AIModerationQueue} />
        <Route path="/a-i-persona-feed" element={AIPersonaFeed} />
        <Route path="/a-i-persona-system" element={AIPersonaSystem} />
        <Route path="/a-i-tools-hub" element={AIToolsHub} />
        <Route path="/a-i-trading" element={AITrading} />
        <Route path="/a-i-training-loops" element={AITrainingLoops} />
        <Route path="/a-p-i-docs" element={APIDocs} />
        <Route path="/a-p-i-documentation" element={APIDocumentation} />
        <Route path="/a-p-i-integration" element={APIIntegration} />
        <Route path="/a-p-i-keys" element={APIKeys} />
        <Route path="/a-p-i-logs" element={APILogs} />
        <Route path="/a-p-i-management" element={APIManagement} />
        <Route path="/a-p-i-monitoring" element={APIMonitoring} />
        <Route path="/a-p-i-status" element={APIStatus} />
        <Route path="/a-p-i-testing" element={APITesting} />
        <Route path="/a-p-i-usage" element={APIUsage} />
        <Route path="/a-p-i-versioning" element={APIVersioning} />
        <Route path="/a-p-y-tracking" element={APYTracking} />
        <Route path="/about" element={About} />
        <Route path="/access-control" element={AccessControl} />
        <Route path="/accessibility-settings" element={AccessibilitySettings} />
        <Route path="/accordion-navigation" element={AccordionNavigation} />
        <Route path="/account-settings" element={AccountSettings} />
        <Route path="/achievement-badges" element={AchievementBadges} />
        <Route path="/achievements" element={Achievements} />
        <Route path="/action-objects" element={ActionObjects} />
        <Route path="/action-panel" element={ActionPanel} />
        <Route path="/activity-feed" element={ActivityFeed} />
        <Route path="/activity-tracking" element={ActivityTracking} />
        <Route path="/adaptive-personalization" element={AdaptivePersonalization} />
        <Route path="/adaptive-roadmap" element={AdaptiveRoadmap} />
        <Route path="/add-bank-account" element={AddBankAccount} />
        <Route path="/add-credit-card" element={AddCreditCard} />
        <Route path="/address-book" element={AddressBook} />
        <Route path="/address-lookup" element={AddressLookup} />
        <Route path="/admin" element={Admin} />
        <Route path="/admin-dashboard" element={AdminDashboard} />
        <Route path="/admin-orders" element={AdminOrders} />
        <Route path="/admin-panel" element={AdminPanel} />
        <Route path="/admin-wallet-manager" element={AdminWalletManager} />
        <Route path="/advanced-admin-panel" element={AdvancedAdminPanel} />
        <Route path="/advanced-analytics" element={AdvancedAnalytics} />
        <Route path="/advanced-orders" element={AdvancedOrders} />
        <Route path="/advanced-search" element={AdvancedSearch} />
        <Route path="/affiliate-dashboard" element={AffiliateDashboard} />
        <Route path="/affiliate-program" element={AffiliateProgram} />
        <Route path="/age-gate" element={AgeGate} />
        <Route path="/age-verification" element={AgeVerification} />
        <Route path="/agent-builder" element={AgentBuilder} />
        <Route path="/agent-city" element={AgentCity} />
        <Route path="/agent-coordination" element={AgentCoordination} />
        <Route path="/agent-coordination-hub" element={AgentCoordinationHub} />
        <Route path="/agent-debate" element={AgentDebate} />
        <Route path="/agent-detail" element={AgentDetail} />
        <Route path="/agent-marketplace" element={AgentMarketplace} />
        <Route path="/agent-performance" element={AgentPerformance} />
        <Route path="/agent-sprint" element={AgentSprint} />
        <Route path="/agents-dashboard" element={AgentsDashboard} />
        <Route path="/ai-core" element={AiCore} />
        <Route path="/alert-configuration" element={AlertConfiguration} />
        <Route path="/alert-dialog" element={AlertDialog} />
        <Route path="/alert-management" element={AlertManagement} />
        <Route path="/ambient-feed" element={AmbientFeed} />
        <Route path="/analytics" element={Analytics} />
        <Route path="/analytics-dashboard" element={AnalyticsDashboard} />
        <Route path="/analytics-products" element={AnalyticsProducts} />
        <Route path="/analytics-reports" element={AnalyticsReports} />
        <Route path="/anomaly-detection" element={AnomalyDetection} />
        <Route path="/anti-surveillance" element={AntiSurveillance} />
        <Route path="/approval-workflows" element={ApprovalWorkflows} />
        <Route path="/arbitrage-bot" element={ArbitrageBot} />
        <Route path="/arcade" element={Arcade} />
        <Route path="/archive-management" element={ArchiveManagement} />
        <Route path="/asset-allocation" element={AssetAllocation} />
        <Route path="/asset-management" element={AssetManagement} />
        <Route path="/asset-tracking" element={AssetTracking} />
        <Route path="/assignment-tracker" element={AssignmentTracker} />
        <Route path="/attribution-modeling" element={AttributionModeling} />
        <Route path="/audience-segmentation" element={AudienceSegmentation} />
        <Route path="/audio-analytics" element={AudioAnalytics} />
        <Route path="/audio-editing" element={AudioEditing} />
        <Route path="/audio-library" element={AudioLibrary} />
        <Route path="/audio-player" element={AudioPlayer} />
        <Route path="/audit-log" element={AuditLog} />
        <Route path="/audit-logs" element={AuditLogs} />
        <Route path="/audit-trail" element={AuditTrail} />
        <Route path="/auto-responder" element={AutoResponder} />
        <Route path="/automation-engine" element={AutomationEngine} />
        <Route path="/automation-rules" element={AutomationRules} />
        <Route path="/automation-workflows" element={AutomationWorkflows} />
        <Route path="/backup-management" element={BackupManagement} />
        <Route path="/badges" element={Badges} />
        <Route path="/ban-suspend-user" element={BanSuspendUser} />
        <Route path="/batch-generation" element={BatchGeneration} />
        <Route path="/battle-pass" element={BattlePass} />
        <Route path="/behavioral-intelligence" element={BehavioralIntelligence} />
        <Route path="/beta" element={Beta} />
        <Route path="/billing-history" element={BillingHistory} />
        <Route path="/block-browser" element={BlockBrowser} />
        <Route path="/block-rewards" element={BlockRewards} />
        <Route path="/block-user" element={BlockUser} />
        <Route path="/blockchain-custody" element={BlockchainCustody} />
        <Route path="/blockchain-monitor" element={BlockchainMonitor} />
        <Route path="/blocked-users" element={BlockedUsers} />
        <Route path="/blog-editor" element={BlogEditor} />
        <Route path="/blog-publisher" element={BlogPublisher} />
        <Route path="/book-page" element={BookPage} />
        <Route path="/bookmarks" element={Bookmarks} />
        <Route path="/bounty-system" element={BountySystem} />
        <Route path="/brand-guidelines" element={BrandGuidelines} />
        <Route path="/breadcrumb-navigation" element={BreadcrumbNavigation} />
        <Route path="/bridge-protocol" element={BridgeProtocol} />
        <Route path="/bridge-transactions" element={BridgeTransactions} />
        <Route path="/browser-extension" element={BrowserExtension} />
        <Route path="/budget-planner" element={BudgetPlanner} />
        <Route path="/bug-reporting" element={BugReporting} />
        <Route path="/build-order" element={BuildOrder} />
        <Route path="/build-roadmap" element={BuildRoadmap} />
        <Route path="/bulk-operations" element={BulkOperations} />
        <Route path="/bulk-ordering" element={BulkOrdering} />
        <Route path="/bulk-upload" element={BulkUpload} />
        <Route path="/c-c-p-a" element={CCPA} />
        <Route path="/c-d-n-management" element={CDNManagement} />
        <Route path="/c-r-m" element={CRM} />
        <Route path="/cache-management" element={CacheManagement} />
        <Route path="/calculator" element={Calculator} />
        <Route path="/calendar" element={Calendar} />
        <Route path="/calendar-view" element={CalendarView} />
        <Route path="/campaign-analytics" element={CampaignAnalytics} />
        <Route path="/campaign-builder" element={CampaignBuilder} />
        <Route path="/campaign-creation" element={CampaignCreation} />
        <Route path="/car-rental" element={CarRental} />
        <Route path="/card-grid-view" element={CardGridView} />
        <Route path="/cash-flow-analysis" element={CashFlowAnalysis} />
        <Route path="/category-management" element={CategoryManagement} />
        <Route path="/certificate-manager" element={CertificateManager} />
        <Route path="/chain-explorer" element={ChainExplorer} />
        <Route path="/change-log" element={ChangeLog} />
        <Route path="/channel-customization" element={ChannelCustomization} />
        <Route path="/charity" element={Charity} />
        <Route path="/charity-leaderboard" element={CharityLeaderboard} />
        <Route path="/chart-analysis" element={ChartAnalysis} />
        <Route path="/chart-dashboard" element={ChartDashboard} />
        <Route path="/chat-bot" element={ChatBot} />
        <Route path="/chat-history" element={ChatHistory} />
        <Route path="/chat-m-v-p" element={ChatMVP} />
        <Route path="/checkbox-group-form" element={CheckboxGroupForm} />
        <Route path="/checkout" element={Checkout} />
        <Route path="/checkout-flow" element={CheckoutFlow} />
        <Route path="/china-edition" element={ChinaEdition} />
        <Route path="/churn-prediction" element={ChurnPrediction} />
        <Route path="/citizen-passport" element={CitizenPassport} />
        <Route path="/civilization-simulator" element={CivilizationSimulator} />
        <Route path="/clan-wars" element={ClanWars} />
        <Route path="/classroom-management" element={ClassroomManagement} />
        <Route path="/client-libraries" element={ClientLibraries} />
        <Route path="/closing-checklist" element={ClosingChecklist} />
        <Route path="/code-completion" element={CodeCompletion} />
        <Route path="/code-formatter" element={CodeFormatter} />
        <Route path="/code-highlighting" element={CodeHighlighting} />
        <Route path="/code-quality" element={CodeQuality} />
        <Route path="/code-quality-dashboard" element={CodeQualityDashboard} />
        <Route path="/code-repository" element={CodeRepository} />
        <Route path="/code-samples" element={CodeSamples} />
        <Route path="/cohort-analysis" element={CohortAnalysis} />
        <Route path="/color-picker-dialog" element={ColorPickerDialog} />
        <Route path="/comment-thread" element={CommentThread} />
        <Route path="/comments" element={Comments} />
        <Route path="/comments-section" element={CommentsSection} />
        <Route path="/commission-management" element={CommissionManagement} />
        <Route path="/community" element={Community} />
        <Route path="/community-create" element={CommunityCreate} />
        <Route path="/community-engagement" element={CommunityEngagement} />
        <Route path="/community-guidelines" element={CommunityGuidelines} />
        <Route path="/community-hub" element={CommunityHub} />
        <Route path="/company-simulator" element={CompanySimulator} />
        <Route path="/competitive-radar" element={CompetitiveRadar} />
        <Route path="/compliance-center" element={ComplianceCenter} />
        <Route path="/compliance-checker" element={ComplianceChecker} />
        <Route path="/compliance-checking" element={ComplianceChecking} />
        <Route path="/compliance-dashboard" element={ComplianceDashboard} />
        <Route path="/compliance-reports" element={ComplianceReports} />
        <Route path="/component-showcase" element={ComponentShowcase} />
        <Route path="/comprehensive-ecosystem-landing" element={ComprehensiveEcosystemLanding} />
        <Route path="/confirmation-dialog" element={ConfirmationDialog} />
        <Route path="/connected-apps" element={ConnectedApps} />
        <Route path="/connection-error" element={ConnectionError} />
        <Route path="/connection-requests" element={ConnectionRequests} />
        <Route path="/connector-intelligence" element={ConnectorIntelligence} />
        <Route path="/contact-management" element={ContactManagement} />
        <Route path="/contact-us-form" element={ContactUsForm} />
        <Route path="/content-analytics" element={ContentAnalytics} />
        <Route path="/content-calendar" element={ContentCalendar} />
        <Route path="/content-collaboration" element={ContentCollaboration} />
        <Route path="/content-flagging" element={ContentFlagging} />
        <Route path="/content-library" element={ContentLibrary} />
        <Route path="/content-moderation" element={ContentModeration} />
        <Route path="/content-scheduler" element={ContentScheduler} />
        <Route path="/content-scheduling" element={ContentScheduling} />
        <Route path="/content-upload" element={ContentUpload} />
        <Route path="/content-vault" element={ContentVault} />
        <Route path="/context-menu" element={ContextMenu} />
        <Route path="/contract-a-b-i" element={ContractABI} />
        <Route path="/contract-management" element={ContractManagement} />
        <Route path="/contribution-interface" element={ContributionInterface} />
        <Route path="/conversation-archive" element={ConversationArchive} />
        <Route path="/conversation-history" element={ConversationHistory} />
        <Route path="/conversion-funnel" element={ConversionFunnel} />
        <Route path="/conversion-optimization" element={ConversionOptimization} />
        <Route path="/cookie-policy" element={CookiePolicy} />
        <Route path="/copyright-management" element={CopyrightManagement} />
        <Route path="/cost-allocation" element={CostAllocation} />
        <Route path="/cost-basis-calculation" element={CostBasisCalculation} />
        <Route path="/course-builder" element={CourseBuilder} />
        <Route path="/course-catalog" element={CourseCatalog} />
        <Route path="/cover-photo" element={CoverPhoto} />
        <Route path="/create-article" element={CreateArticle} />
        <Route path="/create-audio" element={CreateAudio} />
        <Route path="/create-drop" element={CreateDrop} />
        <Route path="/create-reel" element={CreateReel} />
        <Route path="/creator-analytics" element={CreatorAnalytics} />
        <Route path="/creator-dashboard" element={CreatorDashboard} />
        <Route path="/creator-economy" element={CreatorEconomy} />
        <Route path="/creator-funding" element={CreatorFunding} />
        <Route path="/creator-grants" element={CreatorGrants} />
        <Route path="/creator-intelligence" element={CreatorIntelligence} />
        <Route path="/creator-monetization" element={CreatorMonetization} />
        <Route path="/creator-network" element={CreatorNetwork} />
        <Route path="/creator-onboarding" element={CreatorOnboarding} />
        <Route path="/creator-profile" element={CreatorProfile} />
        <Route path="/creator-spotlight" element={CreatorSpotlight} />
        <Route path="/creator-studio" element={CreatorStudio} />
        <Route path="/cross-chain-interop" element={CrossChainInterop} />
        <Route path="/cross-chain-swap" element={CrossChainSwap} />
        <Route path="/crypto" element={Crypto} />
        <Route path="/crypto-enhancements-page" element={CryptoEnhancementsPage} />
        <Route path="/crypto-exchange" element={CryptoExchange} />
        <Route path="/crypto-hub" element={CryptoHub} />
        <Route path="/crypto-news" element={CryptoNews} />
        <Route path="/crypto-research-hub" element={CryptoResearchHub} />
        <Route path="/custom-dashboard" element={CustomDashboard} />
        <Route path="/custom-reports" element={CustomReports} />
        <Route path="/customer-analytics" element={CustomerAnalytics} />
        <Route path="/customer-disputes" element={CustomerDisputes} />
        <Route path="/d-a-o-governance" element={DAOGovernance} />
        <Route path="/d-a-o-treasury" element={DAOTreasury} />
        <Route path="/d-c-a-calculator" element={DCACalculator} />
        <Route path="/d-e-x-depth-chart" element={DEXDepthChart} />
        <Route path="/d-m-inbox" element={DMInbox} />
        <Route path="/dashboard" element={Dashboard} />
        <Route path="/dashboard-overview" element={DashboardOverview} />
        <Route path="/data-export" element={DataExport} />
        <Route path="/data-grid" element={DataGrid} />
        <Route path="/data-lake" element={DataLake} />
        <Route path="/data-privacy" element={DataPrivacy} />
        <Route path="/data-processing" element={DataProcessing} />
        <Route path="/data-retention" element={DataRetention} />
        <Route path="/data-table" element={DataTable} />
        <Route path="/data-visualization" element={DataVisualization} />
        <Route path="/database-management" element={DatabaseManagement} />
        <Route path="/date-input-form" element={DateInputForm} />
        <Route path="/date-picker-dialog" element={DatePickerDialog} />
        <Route path="/dating-discovery" element={DatingDiscovery} />
        <Route path="/dating-home" element={DatingHome} />
        <Route path="/dating-matches" element={DatingMatches} />
        <Route path="/dating-messages" element={DatingMessages} />
        <Route path="/dating-premium" element={DatingPremium} />
        <Route path="/dating-profile" element={DatingProfile} />
        <Route path="/dating-profile-setup" element={DatingProfileSetup} />
        <Route path="/dating-subscription" element={DatingSubscription} />
        <Route path="/day-trade-room" element={DayTradeRoom} />
        <Route path="/de-fi" element={DeFi} />
        <Route path="/decentralized-identity" element={DecentralizedIdentity} />
        <Route path="/defensibility-moat" element={DefensibilityMoat} />
        <Route path="/delete-account" element={DeleteAccount} />
        <Route path="/delete-content" element={DeleteContent} />
        <Route path="/department-management" element={DepartmentManagement} />
        <Route path="/dependency-graph" element={DependencyGraph} />
        <Route path="/deployment-pipeline" element={DeploymentPipeline} />
        <Route path="/deprecation-policy" element={DeprecationPolicy} />
        <Route path="/derivative-trading" element={DerivativeTrading} />
        <Route path="/derivatives-trading" element={DerivativesTrading} />
        <Route path="/destination-guide" element={DestinationGuide} />
        <Route path="/destiny-engine" element={DestinyEngine} />
        <Route path="/dev-ops" element={DevOps} />
        <Route path="/developer-area" element={DeveloperArea} />
        <Route path="/developer-community" element={DeveloperCommunity} />
        <Route path="/developer-marketplace" element={DeveloperMarketplace} />
        <Route path="/developer-protocol" element={DeveloperProtocol} />
        <Route path="/difficulty-calculator" element={DifficultyCalculator} />
        <Route path="/difficulty-tracking" element={DifficultyTracking} />
        <Route path="/digital-art-store" element={DigitalArtStore} />
        <Route path="/digital-nation-mode" element={DigitalNationMode} />
        <Route path="/digital-twin" element={DigitalTwin} />
        <Route path="/direct-messages" element={DirectMessages} />
        <Route path="/direct-messaging" element={DirectMessaging} />
        <Route path="/disaster-recovery" element={DisasterRecovery} />
        <Route path="/discord-integration" element={DiscordIntegration} />
        <Route path="/discover" element={Discover} />
        <Route path="/discussion-board" element={DiscussionBoard} />
        <Route path="/discussion-forums" element={DiscussionForums} />
        <Route path="/dispute-resolution" element={DisputeResolution} />
        <Route path="/distribution-channels" element={DistributionChannels} />
        <Route path="/document-editor" element={DocumentEditor} />
        <Route path="/document-management" element={DocumentManagement} />
        <Route path="/document-sharing" element={DocumentSharing} />
        <Route path="/document-signing" element={DocumentSigning} />
        <Route path="/documentation" element={Documentation} />
        <Route path="/dogecoin-pool-selection" element={DogecoinPoolSelection} />
        <Route path="/domain-management" element={DomainManagement} />
        <Route path="/donation-processing" element={DonationProcessing} />
        <Route path="/dropdown-menu" element={DropdownMenu} />
        <Route path="/e-n-s-resolver" element={ENSResolver} />
        <Route path="/earnings-tracker" element={EarningsTracker} />
        <Route path="/earnings-tracking" element={EarningsTracking} />
        <Route path="/economic-layer" element={EconomicLayer} />
        <Route path="/economics" element={Economics} />
        <Route path="/economy-control" element={EconomyControl} />
        <Route path="/ecosystem" element={Ecosystem} />
        <Route path="/edit-profile" element={EditProfile} />
        <Route path="/email-campaigns" element={EmailCampaigns} />
        <Route path="/email-configuration" element={EmailConfiguration} />
        <Route path="/email-input-form" element={EmailInputForm} />
        <Route path="/email-integration" element={EmailIntegration} />
        <Route path="/email-notifications" element={EmailNotifications} />
        <Route path="/email-templates" element={EmailTemplates} />
        <Route path="/email-verification" element={EmailVerification} />
        <Route path="/embed-s-d-k" element={EmbedSDK} />
        <Route path="/empty-search-state" element={EmptySearchState} />
        <Route path="/engagement-metrics" element={EngagementMetrics} />
        <Route path="/engagement-stats" element={EngagementStats} />
        <Route path="/engineer" element={Engineer} />
        <Route path="/enterprise" element={Enterprise} />
        <Route path="/enterprise-a-p-i" element={EnterpriseAPI} />
        <Route path="/enterprise-analytics" element={EnterpriseAnalytics} />
        <Route path="/enterprise-billing" element={EnterpriseBilling} />
        <Route path="/entity-profile" element={EntityProfile} />
        <Route path="/environment-management" element={EnvironmentManagement} />
        <Route path="/error403" element={Error403} />
        <Route path="/error404" element={Error404} />
        <Route path="/error500" element={Error500} />
        <Route path="/error503" element={Error503} />
        <Route path="/error-dialog" element={ErrorDialog} />
        <Route path="/error-tracking" element={ErrorTracking} />
        <Route path="/escrow-shop" element={EscrowShop} />
        <Route path="/ethereum-pool-selector" element={EthereumPoolSelector} />
        <Route path="/event-analytics" element={EventAnalytics} />
        <Route path="/event-calendar" element={EventCalendar} />
        <Route path="/event-creation" element={EventCreation} />
        <Route path="/event-planner" element={EventPlanner} />
        <Route path="/event-registration" element={EventRegistration} />
        <Route path="/events" element={Events} />
        <Route path="/execution-history" element={ExecutionHistory} />
        <Route path="/exercise-library" element={ExerciseLibrary} />
        <Route path="/expense-management" element={ExpenseManagement} />
        <Route path="/expense-tracker" element={ExpenseTracker} />
        <Route path="/experiment-factory" element={ExperimentFactory} />
        <Route path="/experiment-tracker" element={ExperimentTracker} />
        <Route path="/explore" element={Explore} />
        <Route path="/export-data" element={ExportData} />
        <Route path="/f-a-q-management" element={FAQManagement} />
        <Route path="/f-a-q-page" element={FAQPage} />
        <Route path="/farming" element={Farming} />
        <Route path="/favorites" element={Favorites} />
        <Route path="/feature-requests" element={FeatureRequests} />
        <Route path="/feature-tour" element={FeatureTour} />
        <Route path="/features" element={Features} />
        <Route path="/fee-calculation" element={FeeCalculation} />
        <Route path="/feed-with-posts" element={FeedWithPosts} />
        <Route path="/feedback" element={Feedback} />
        <Route path="/feedback-dialog" element={FeedbackDialog} />
        <Route path="/feedback-form" element={FeedbackForm} />
        <Route path="/feedback-hub" element={FeedbackHub} />
        <Route path="/file-browser" element={FileBrowser} />
        <Route path="/file-converter" element={FileConverter} />
        <Route path="/file-download" element={FileDownload} />
        <Route path="/file-preview" element={FilePreview} />
        <Route path="/file-sharing" element={FileSharing} />
        <Route path="/file-upload-dialog" element={FileUploadDialog} />
        <Route path="/file-upload-form" element={FileUploadForm} />
        <Route path="/file-upload-progress" element={FileUploadProgress} />
        <Route path="/file-versioning" element={FileVersioning} />
        <Route path="/filter-panel" element={FilterPanel} />
        <Route path="/financial-reports" element={FinancialReports} />
        <Route path="/flash-loans" element={FlashLoans} />
        <Route path="/flight-search" element={FlightSearch} />
        <Route path="/follow-list" element={FollowList} />
        <Route path="/follow-requests" element={FollowRequests} />
        <Route path="/follow-system" element={FollowSystem} />
        <Route path="/follow-unfollow" element={FollowUnfollow} />
        <Route path="/follower-list" element={FollowerList} />
        <Route path="/followers-network" element={FollowersNetwork} />
        <Route path="/forecasting-engine" element={ForecastingEngine} />
        <Route path="/forum-categories" element={ForumCategories} />
        <Route path="/framework-templates" element={FrameworkTemplates} />
        <Route path="/free-will-dashboard" element={FreeWillDashboard} />
        <Route path="/fundraiser-tools" element={FundraiserTools} />
        <Route path="/g-d-p-r" element={GDPR} />
        <Route path="/g-t-m-strategy" element={GTMStrategy} />
        <Route path="/gain-loss-tracking" element={GainLossTracking} />
        <Route path="/game-blackjack" element={GameBlackjack} />
        <Route path="/game-block-builder" element={GameBlockBuilder} />
        <Route path="/game-chat" element={GameChat} />
        <Route path="/game-crash" element={GameCrash} />
        <Route path="/game-crypto-quiz" element={GameCryptoQuiz} />
        <Route path="/game-fi-quest-board" element={GameFiQuestBoard} />
        <Route path="/game-lobby" element={GameLobby} />
        <Route path="/game-room" element={GameRoom} />
        <Route path="/game-settings" element={GameSettings} />
        <Route path="/game-slots" element={GameSlots} />
        <Route path="/game-token-tap" element={GameTokenTap} />
        <Route path="/gaming" element={Gaming} />
        <Route path="/gaming-for-charity" element={GamingForCharity} />
        <Route path="/gantt-chart" element={GanttChart} />
        <Route path="/gas-fee-estimator" element={GasFeeEstimator} />
        <Route path="/gas-price-monitor" element={GasPriceMonitor} />
        <Route path="/gas-tracker" element={GasTracker} />
        <Route path="/general-settings" element={GeneralSettings} />
        <Route path="/generated-api-explorer" element={GeneratedApiExplorer} />
        <Route path="/generated-gallery" element={GeneratedGallery} />
        <Route path="/getting-started-guide" element={GettingStartedGuide} />
        <Route path="/ghost-mode" element={GhostMode} />
        <Route path="/global-operations-center" element={GlobalOperationsCenter} />
        <Route path="/global-search" element={GlobalSearch} />
        <Route path="/governance" element={Governance} />
        <Route path="/governance-voting" element={GovernanceVoting} />
        <Route path="/governance-wizard" element={GovernanceWizard} />
        <Route path="/grade-book" element={GradeBook} />
        <Route path="/group-chat" element={GroupChat} />
        <Route path="/group-chats" element={GroupChats} />
        <Route path="/group-directory" element={GroupDirectory} />
        <Route path="/group-events" element={GroupEvents} />
        <Route path="/group-management" element={GroupManagement} />
        <Route path="/growth" element={Growth} />
        <Route path="/guilds" element={Guilds} />
        <Route path="/h-i-p-a-a" element={HIPAA} />
        <Route path="/h-o-p-e-a-i-control" element={HOPEAIControl} />
        <Route path="/hash-rate-monitor" element={HashRateMonitor} />
        <Route path="/hashtag-explorer" element={HashtagExplorer} />
        <Route path="/hashtag-search" element={HashtagSearch} />
        <Route path="/hashtags" element={Hashtags} />
        <Route path="/health-articles" element={HealthArticles} />
        <Route path="/health-dashboard" element={HealthDashboard} />
        <Route path="/health-goals" element={HealthGoals} />
        <Route path="/help-center" element={HelpCenter} />
        <Route path="/home" element={Home} />
        <Route path="/hope-a-i" element={HopeAI} />
        <Route path="/hope-a-i-advanced" element={HopeAIAdvanced} />
        <Route path="/hope-a-i-meta" element={HopeAIMeta} />
        <Route path="/hope-a-i-page" element={HopeAIPage} />
        <Route path="/hope-a-i-upgrades" element={HopeAIUpgrades} />
        <Route path="/hotel-search" element={HotelSearch} />
        <Route path="/hub-spot-integration" element={HubSpotIntegration} />
        <Route path="/i-c-o-launchpad" element={ICOLaunchpad} />
        <Route path="/i-f-t-t-t" element={IFTTT} />
        <Route path="/i-i-t-r" element={IITR} />
        <Route path="/i-t-services-landing" element={ITServicesLanding} />
        <Route path="/i-t-services-portal" element={ITServicesPortal} />
        <Route path="/image-editor" element={ImageEditor} />
        <Route path="/image-gallery" element={ImageGallery} />
        <Route path="/image-tools" element={ImageTools} />
        <Route path="/image-viewer" element={ImageViewer} />
        <Route path="/impact-map" element={ImpactMap} />
        <Route path="/impact-metrics" element={ImpactMetrics} />
        <Route path="/in-app-notifications" element={InAppNotifications} />
        <Route path="/in-game-currency" element={InGameCurrency} />
        <Route path="/incident-management" element={IncidentManagement} />
        <Route path="/input-dialog" element={InputDialog} />
        <Route path="/instructor-dashboard" element={InstructorDashboard} />
        <Route path="/integration-setup" element={IntegrationSetup} />
        <Route path="/integrations" element={Integrations} />
        <Route path="/inventory-management" element={InventoryManagement} />
        <Route path="/investment-goals" element={InvestmentGoals} />
        <Route path="/investor-metrics" element={InvestorMetrics} />
        <Route path="/investor-pitch" element={InvestorPitch} />
        <Route path="/investor-portal" element={InvestorPortal} />
        <Route path="/investor-room" element={InvestorRoom} />
        <Route path="/invoice-details" element={InvoiceDetails} />
        <Route path="/invoice-management" element={InvoiceManagement} />
        <Route path="/k-y-c-verification" element={KYCVerification} />
        <Route path="/knowledge-base" element={KnowledgeBase} />
        <Route path="/l-d-a-p-integration" element={LDAPIntegration} />
        <Route path="/l-t-v-analysis" element={LTVAnalysis} />
        <Route path="/landing-page" element={LandingPage} />
        <Route path="/language-exchange-admin" element={LanguageExchangeAdmin} />
        <Route path="/language-partner-discovery" element={LanguagePartnerDiscovery} />
        <Route path="/language-selector" element={LanguageSelector} />
        <Route path="/language-settings" element={LanguageSettings} />
        <Route path="/lead-scoring" element={LeadScoring} />
        <Route path="/leaderboard" element={Leaderboard} />
        <Route path="/leaderboards" element={Leaderboards} />
        <Route path="/learning" element={Learning} />
        <Route path="/learning-path" element={LearningPath} />
        <Route path="/legal-documents" element={LegalDocuments} />
        <Route path="/legendary-status" element={LegendaryStatus} />
        <Route path="/lending-borrow" element={LendingBorrow} />
        <Route path="/lending-borrowing" element={LendingBorrowing} />
        <Route path="/lesson-editor" element={LessonEditor} />
        <Route path="/life-command" element={LifeCommand} />
        <Route path="/lightbox" element={Lightbox} />
        <Route path="/like-reaction-system" element={LikeReactionSystem} />
        <Route path="/likes" element={Likes} />
        <Route path="/liquid-staking" element={LiquidStaking} />
        <Route path="/liquidity-pools" element={LiquidityPools} />
        <Route path="/list-view" element={ListView} />
        <Route path="/live" element={Live} />
        <Route path="/live-chat" element={LiveChat} />
        <Route path="/live-gifting" element={LiveGifting} />
        <Route path="/live-reactions" element={LiveReactions} />
        <Route path="/live-stream-setup" element={LiveStreamSetup} />
        <Route path="/live-streaming" element={LiveStreaming} />
        <Route path="/livestream-dashboard" element={LivestreamDashboard} />
        <Route path="/load-balancing" element={LoadBalancing} />
        <Route path="/loading-dialog" element={LoadingDialog} />
        <Route path="/log-viewer" element={LogViewer} />
        <Route path="/login" element={Login} />
        <Route path="/logistics-optimizer" element={LogisticsOptimizer} />
        <Route path="/m-l-insights" element={MLInsights} />
        <Route path="/m-l-models" element={MLModels} />
        <Route path="/mailing-lists" element={MailingLists} />
        <Route path="/main-dashboard" element={MainDashboard} />
        <Route path="/maintenance-mode" element={MaintenanceMode} />
        <Route path="/map-view" element={MapView} />
        <Route path="/margin-trading" element={MarginTrading} />
        <Route path="/markdown-rendering" element={MarkdownRendering} />
        <Route path="/market-sentiment" element={MarketSentiment} />
        <Route path="/marketing-r-o-i" element={MarketingROI} />
        <Route path="/marketplace" element={Marketplace} />
        <Route path="/marketplace-analytics" element={MarketplaceAnalytics} />
        <Route path="/marketplace-section" element={MarketplaceSection} />
        <Route path="/master-architecture" element={MasterArchitecture} />
        <Route path="/match-chat" element={MatchChat} />
        <Route path="/match-feed" element={MatchFeed} />
        <Route path="/match-space" element={MatchSpace} />
        <Route path="/matching-algorithm" element={MatchingAlgorithm} />
        <Route path="/matchmaking" element={Matchmaking} />
        <Route path="/meal-plans" element={MealPlans} />
        <Route path="/media-carousel" element={MediaCarousel} />
        <Route path="/media-gallery" element={MediaGallery} />
        <Route path="/medication-reminder" element={MedicationReminder} />
        <Route path="/mega-marketplace" element={MegaMarketplace} />
        <Route path="/membership-tiers" element={MembershipTiers} />
        <Route path="/memory-constellation" element={MemoryConstellation} />
        <Route path="/memory-graph-visualizer" element={MemoryGraphVisualizer} />
        <Route path="/memory-system" element={MemorySystem} />
        <Route path="/mentions" element={Mentions} />
        <Route path="/message-encryption" element={MessageEncryption} />
        <Route path="/message-search" element={MessageSearch} />
        <Route path="/messages" element={Messages} />
        <Route path="/metaverse-portal" element={MetaversePortal} />
        <Route path="/milestone-tracking" element={MilestoneTracking} />
        <Route path="/miner-dashboard" element={MinerDashboard} />
        <Route path="/mining-calculator" element={MiningCalculator} />
        <Route path="/mining-dashboard" element={MiningDashboard} />
        <Route path="/mining-pool-selector" element={MiningPoolSelector} />
        <Route path="/mission-control" element={MissionControl} />
        <Route path="/missions-section" element={MissionsSection} />
        <Route path="/mobile" element={Mobile} />
        <Route path="/mobile-app" element={MobileApp} />
        <Route path="/mobile-gaming" element={MobileGaming} />
        <Route path="/mobile-home" element={MobileHome} />
        <Route path="/mobile-menu" element={MobileMenu} />
        <Route path="/mobile-messages" element={MobileMessages} />
        <Route path="/mobile-notifications" element={MobileNotifications} />
        <Route path="/mobile-profile" element={MobileProfile} />
        <Route path="/mobile-search" element={MobileSearch} />
        <Route path="/mobile-settings" element={MobileSettings} />
        <Route path="/mobile-shop" element={MobileShop} />
        <Route path="/mobile-streaming" element={MobileStreaming} />
        <Route path="/mobile-trading" element={MobileTrading} />
        <Route path="/mobile-wallet" element={MobileWallet} />
        <Route path="/moderation-dashboard" element={ModerationDashboard} />
        <Route path="/monetization" element={Monetization} />
        <Route path="/mood-tracker" element={MoodTracker} />
        <Route path="/mortgage-calculator" element={MortgageCalculator} />
        <Route path="/movie-catalog" element={MovieCatalog} />
        <Route path="/movie-detail" element={MovieDetail} />
        <Route path="/multi-model-selector" element={MultiModelSelector} />
        <Route path="/multi-select-form" element={MultiSelectForm} />
        <Route path="/multiplayer-lobby" element={MultiplayerLobby} />
        <Route path="/multivariate-testing" element={MultivariateTesting} />
        <Route path="/music-generation" element={MusicGeneration} />
        <Route path="/mutual-connections" element={MutualConnections} />
        <Route path="/mutual-friends" element={MutualFriends} />
        <Route path="/my-learning" element={MyLearning} />
        <Route path="/my-trips" element={MyTrips} />
        <Route path="/n-f-t-gallery" element={NFTGallery} />
        <Route path="/n-f-t-minting" element={NFTMinting} />
        <Route path="/n-f-t-wallet" element={NFTWallet} />
        <Route path="/n-l-p-tools" element={NLPTools} />
        <Route path="/n-s-f-w-feed" element={NSFWFeed} />
        <Route path="/n-s-f-w-platform" element={NSFWPlatform} />
        <Route path="/narrative-engine" element={NarrativeEngine} />
        <Route path="/net-worth-tracker" element={NetWorthTracker} />
        <Route path="/network-graph" element={NetworkGraph} />
        <Route path="/network-health" element={NetworkHealth} />
        <Route path="/network-statistics" element={NetworkStatistics} />
        <Route path="/not-found" element={NotFound} />
        <Route path="/notes-app" element={NotesApp} />
        <Route path="/notification-center" element={NotificationCenter} />
        <Route path="/notification-history" element={NotificationHistory} />
        <Route path="/notification-intelligence" element={NotificationIntelligence} />
        <Route path="/notification-preferences" element={NotificationPreferences} />
        <Route path="/notification-settings" element={NotificationSettings} />
        <Route path="/notifications" element={Notifications} />
        <Route path="/notifications-center" element={NotificationsCenter} />
        <Route path="/notifications-hub" element={NotificationsHub} />
        <Route path="/number-input-form" element={NumberInputForm} />
        <Route path="/nutrition-tracker" element={NutritionTracker} />
        <Route path="/o-auth-providers" element={OAuthProviders} />
        <Route path="/offer-management" element={OfferManagement} />
        <Route path="/onboarding" element={Onboarding} />
        <Route path="/onboarding-tutorial" element={OnboardingTutorial} />
        <Route path="/opportunities-section" element={OpportunitiesSection} />
        <Route path="/options-trading" element={OptionsTrading} />
        <Route path="/oracle-network" element={OracleNetwork} />
        <Route path="/order-book" element={OrderBook} />
        <Route path="/order-confirmation" element={OrderConfirmation} />
        <Route path="/order-history" element={OrderHistory} />
        <Route path="/order-placement" element={OrderPlacement} />
        <Route path="/order-tracking" element={OrderTracking} />
        <Route path="/order-types" element={OrderTypes} />
        <Route path="/organization-settings" element={OrganizationSettings} />
        <Route path="/p2-e-shop" element={P2EShop} />
        <Route path="/pagination" element={Pagination} />
        <Route path="/password-input-form" element={PasswordInputForm} />
        <Route path="/password-reset" element={PasswordReset} />
        <Route path="/pay-pal-integration" element={PayPalIntegration} />
        <Route path="/payment-confirmation" element={PaymentConfirmation} />
        <Route path="/payment-infra" element={PaymentInfra} />
        <Route path="/payment-methods" element={PaymentMethods} />
        <Route path="/payment-setup" element={PaymentSetup} />
        <Route path="/payments" element={Payments} />
        <Route path="/payout-dashboard" element={PayoutDashboard} />
        <Route path="/payout-management" element={PayoutManagement} />
        <Route path="/performance-metrics" element={PerformanceMetrics} />
        <Route path="/performance-tuning" element={PerformanceTuning} />
        <Route path="/permission-management" element={PermissionManagement} />
        <Route path="/perpetual-futures" element={PerpetualFutures} />
        <Route path="/persona-builder" element={PersonaBuilder} />
        <Route path="/phase1-dashboard" element={Phase1Dashboard} />
        <Route path="/phase20-hub" element={Phase20Hub} />
        <Route path="/phase2to4-dashboard" element={Phase2to4Dashboard} />
        <Route path="/phone-verification" element={PhoneVerification} />
        <Route path="/platform-map" element={PlatformMap} />
        <Route path="/platform-status" element={PlatformStatus} />
        <Route path="/playlist-management" element={PlaylistManagement} />
        <Route path="/playlist-manager" element={PlaylistManager} />
        <Route path="/podcast-studio" element={PodcastStudio} />
        <Route path="/policy-management" element={PolicyManagement} />
        <Route path="/pool-performance" element={PoolPerformance} />
        <Route path="/portfolio" element={Portfolio} />
        <Route path="/portfolio-comparison" element={PortfolioComparison} />
        <Route path="/portfolio-optimization" element={PortfolioOptimization} />
        <Route path="/portfolio-overview" element={PortfolioOverview} />
        <Route path="/portfolio-rebalance" element={PortfolioRebalance} />
        <Route path="/portfolio-tracker" element={PortfolioTracker} />
        <Route path="/portfolio-tracking" element={PortfolioTracking} />
        <Route path="/position-management" element={PositionManagement} />
        <Route path="/power-user-tools" element={PowerUserTools} />
        <Route path="/practice-sessions" element={PracticeSessions} />
        <Route path="/predictive-analytics" element={PredictiveAnalytics} />
        <Route path="/predictive-models" element={PredictiveModels} />
        <Route path="/predictive-systems" element={PredictiveSystems} />
        <Route path="/preferences-setup" element={PreferencesSetup} />
        <Route path="/premium-features" element={PremiumFeatures} />
        <Route path="/presentation-with-chat" element={PresentationWithChat} />
        <Route path="/price-alerts" element={PriceAlerts} />
        <Route path="/pricing" element={Pricing} />
        <Route path="/pricing-engine" element={PricingEngine} />
        <Route path="/pricing-management" element={PricingManagement} />
        <Route path="/pricing-rules" element={PricingRules} />
        <Route path="/priority-matrix" element={PriorityMatrix} />
        <Route path="/privacy-mixer" element={PrivacyMixer} />
        <Route path="/privacy-policy" element={PrivacyPolicy} />
        <Route path="/privacy-settings" element={PrivacySettings} />
        <Route path="/privacy-vault" element={PrivacyVault} />
        <Route path="/product-approval" element={ProductApproval} />
        <Route path="/product-brain" element={ProductBrain} />
        <Route path="/product-catalog" element={ProductCatalog} />
        <Route path="/product-comparison" element={ProductComparison} />
        <Route path="/product-detail" element={ProductDetail} />
        <Route path="/product-listing" element={ProductListing} />
        <Route path="/product-listings" element={ProductListings} />
        <Route path="/product-reviews" element={ProductReviews} />
        <Route path="/production-architecture" element={ProductionArchitecture} />
        <Route path="/profile" element={Profile} />
        <Route path="/profile-completion" element={ProfileCompletion} />
        <Route path="/profile-creation" element={ProfileCreation} />
        <Route path="/profile-customization" element={ProfileCustomization} />
        <Route path="/profile-dashboard" element={ProfileDashboard} />
        <Route path="/profile-edit" element={ProfileEdit} />
        <Route path="/profile-picture" element={ProfilePicture} />
        <Route path="/profile-preview" element={ProfilePreview} />
        <Route path="/profile-view" element={ProfileView} />
        <Route path="/profile-wallet" element={ProfileWallet} />
        <Route path="/profitability" element={Profitability} />
        <Route path="/progress-bar" element={ProgressBar} />
        <Route path="/progress-tracking" element={ProgressTracking} />
        <Route path="/project-board" element={ProjectBoard} />
        <Route path="/project-listing" element={ProjectListing} />
        <Route path="/promotion-engine" element={PromotionEngine} />
        <Route path="/prompt-builder" element={PromptBuilder} />
        <Route path="/proof-vault" element={ProofVault} />
        <Route path="/property-comparison" element={PropertyComparison} />
        <Route path="/property-detail" element={PropertyDetail} />
        <Route path="/property-listing" element={PropertyListing} />
        <Route path="/property-transfer" element={PropertyTransfer} />
        <Route path="/protocol-layer" element={ProtocolLayer} />
        <Route path="/publishing-queue" element={PublishingQueue} />
        <Route path="/publishing-schedule" element={PublishingSchedule} />
        <Route path="/push-notifications" element={PushNotifications} />
        <Route path="/q-r-code-generator" element={QRCodeGenerator} />
        <Route path="/quantum-computing" element={QuantumComputing} />
        <Route path="/quantum-safe" element={QuantumSafe} />
        <Route path="/quick-actions" element={QuickActions} />
        <Route path="/quick-stats" element={QuickStats} />
        <Route path="/quiz-builder" element={QuizBuilder} />
        <Route path="/r-f-m-analysis" element={RFMAnalysis} />
        <Route path="/r-f-q-system" element={RFQSystem} />
        <Route path="/radio-button-form" element={RadioButtonForm} />
        <Route path="/rate-limit-config" element={RateLimitConfig} />
        <Route path="/rate-limit-dashboard" element={RateLimitDashboard} />
        <Route path="/rate-limit-error" element={RateLimitError} />
        <Route path="/rate-limiting" element={RateLimiting} />
        <Route path="/rating-system" element={RatingSystem} />
        <Route path="/read-receipts" element={ReadReceipts} />
        <Route path="/real-time-game-engine" element={RealTimeGameEngine} />
        <Route path="/real-time-monitoring" element={RealTimeMonitoring} />
        <Route path="/real-time-streaming" element={RealTimeStreaming} />
        <Route path="/rebalancing-tools" element={RebalancingTools} />
        <Route path="/receipt-download" element={ReceiptDownload} />
        <Route path="/receive-crypto" element={ReceiveCrypto} />
        <Route path="/recent-activity" element={RecentActivity} />
        <Route path="/recommendations" element={Recommendations} />
        <Route path="/recommendations-feed" element={RecommendationsFeed} />
        <Route path="/recommended-matches" element={RecommendedMatches} />
        <Route path="/reels" element={Reels} />
        <Route path="/refactoring-tools" element={RefactoringTools} />
        <Route path="/referrals" element={Referrals} />
        <Route path="/refund-requests" element={RefundRequests} />
        <Route path="/regional-settings" element={RegionalSettings} />
        <Route path="/reminders" element={Reminders} />
        <Route path="/report-dialog" element={ReportDialog} />
        <Route path="/report-user" element={ReportUser} />
        <Route path="/reports-dashboard" element={ReportsDashboard} />
        <Route path="/reputation" element={Reputation} />
        <Route path="/reputation-section" element={ReputationSection} />
        <Route path="/reputation-system" element={ReputationSystem} />
        <Route path="/resource-allocation" element={ResourceAllocation} />
        <Route path="/resource-library" element={ResourceLibrary} />
        <Route path="/response-time" element={ResponseTime} />
        <Route path="/retention" element={Retention} />
        <Route path="/retention-analytics" element={RetentionAnalytics} />
        <Route path="/retention-engine" element={RetentionEngine} />
        <Route path="/retirement-planner" element={RetirementPlanner} />
        <Route path="/return-management" element={ReturnManagement} />
        <Route path="/returns-refunds" element={ReturnsRefunds} />
        <Route path="/revenue-tracking" element={RevenueTracking} />
        <Route path="/review-moderation" element={ReviewModeration} />
        <Route path="/reviews" element={Reviews} />
        <Route path="/reviews-ratings" element={ReviewsRatings} />
        <Route path="/reward-system" element={RewardSystem} />
        <Route path="/rewards-monitoring" element={RewardsMonitoring} />
        <Route path="/rewards-tracking" element={RewardsTracking} />
        <Route path="/risk-analysis" element={RiskAnalysis} />
        <Route path="/risk-management" element={RiskManagement} />
        <Route path="/roadmap" element={Roadmap} />
        <Route path="/roadmap-view" element={RoadmapView} />
        <Route path="/role-based-access" element={RoleBasedAccess} />
        <Route path="/role-management" element={RoleManagement} />
        <Route path="/s-d-k-download" element={SDKDownload} />
        <Route path="/s-d-k-management" element={SDKManagement} />
        <Route path="/s-e-o-optimizer" element={SEOOptimizer} />
        <Route path="/s-k-y444-central-bank" element={SKY444CentralBank} />
        <Route path="/s-m-s-campaigns" element={SMSCampaigns} />
        <Route path="/s-m-s-integration" element={SMSIntegration} />
        <Route path="/s-m-s-templates" element={SMSTemplates} />
        <Route path="/s-m-t-p-settings" element={SMTPSettings} />
        <Route path="/s-o-c2" element={SOC2} />
        <Route path="/s-s-l-certificates" element={SSLCertificates} />
        <Route path="/s-s-o" element={SSO} />
        <Route path="/sales-analytics" element={SalesAnalytics} />
        <Route path="/salesforce-integration" element={SalesforceIntegration} />
        <Route path="/satisfaction-survey" element={SatisfactionSurvey} />
        <Route path="/saved-properties" element={SavedProperties} />
        <Route path="/saved-searches" element={SavedSearches} />
        <Route path="/savings-goals" element={SavingsGoals} />
        <Route path="/scheduled-jobs" element={ScheduledJobs} />
        <Route path="/scheduled-reports" element={ScheduledReports} />
        <Route path="/school" element={School} />
        <Route path="/school-certificate" element={SchoolCertificate} />
        <Route path="/school-course" element={SchoolCourse} />
        <Route path="/school-dashboard" element={SchoolDashboard} />
        <Route path="/school-lesson" element={SchoolLesson} />
        <Route path="/school-quiz" element={SchoolQuiz} />
        <Route path="/search" element={Search} />
        <Route path="/search-analytics" element={SearchAnalytics} />
        <Route path="/search-history" element={SearchHistory} />
        <Route path="/search-results" element={SearchResults} />
        <Route path="/search-suggestions" element={SearchSuggestions} />
        <Route path="/seasonal-events" element={SeasonalEvents} />
        <Route path="/security" element={Security} />
        <Route path="/security-audit" element={SecurityAudit} />
        <Route path="/security-compliance" element={SecurityCompliance} />
        <Route path="/security-dashboard" element={SecurityDashboard} />
        <Route path="/security-settings" element={SecuritySettings} />
        <Route path="/segmentation-analysis" element={SegmentationAnalysis} />
        <Route path="/select-dropdown-form" element={SelectDropdownForm} />
        <Route path="/self-healing-infra" element={SelfHealingInfra} />
        <Route path="/seller-dashboard" element={SellerDashboard} />
        <Route path="/seller-profile" element={SellerProfile} />
        <Route path="/send-crypto" element={SendCrypto} />
        <Route path="/sentiment-pipeline" element={SentimentPipeline} />
        <Route path="/server-health" element={ServerHealth} />
        <Route path="/server-installer" element={ServerInstaller} />
        <Route path="/server-status" element={ServerStatus} />
        <Route path="/settings" element={Settings} />
        <Route path="/settings-dialog" element={SettingsDialog} />
        <Route path="/setup-wizard" element={SetupWizard} />
        <Route path="/shadow-identity" element={ShadowIdentity} />
        <Route path="/shadow-relay" element={ShadowRelay} />
        <Route path="/share-dialog" element={ShareDialog} />
        <Route path="/shares" element={Shares} />
        <Route path="/sharing" element={Sharing} />
        <Route path="/shipping-management" element={ShippingManagement} />
        <Route path="/shopping-cart" element={ShoppingCart} />
        <Route path="/sidebar-navigation" element={SidebarNavigation} />
        <Route path="/sign-up" element={SignUp} />
        <Route path="/sign-up-flow" element={SignUpFlow} />
        <Route path="/sign-up_old" element={SignUp_old} />
        <Route path="/signin" element={Signin} />
        <Route path="/situation-room" element={SituationRoom} />
        <Route path="/skill-badges" element={SkillBadges} />
        <Route path="/sky-school" element={SkySchool} />
        <Route path="/sky-school-a-i" element={SkySchoolAI} />
        <Route path="/sky-school-quiz" element={SkySchoolQuiz} />
        <Route path="/sky-store" element={SkyStore} />
        <Route path="/slack-integration" element={SlackIntegration} />
        <Route path="/sleep-tracking" element={SleepTracking} />
        <Route path="/slippage-protection" element={SlippageProtection} />
        <Route path="/smart-contract-audit" element={SmartContractAudit} />
        <Route path="/smart-contract-viewer" element={SmartContractViewer} />
        <Route path="/smart-contracts" element={SmartContracts} />
        <Route path="/social-analytics" element={SocialAnalytics} />
        <Route path="/social-events" element={SocialEvents} />
        <Route path="/social-feed" element={SocialFeed} />
        <Route path="/social-feed-v2" element={SocialFeedV2} />
        <Route path="/social-graph" element={SocialGraph} />
        <Route path="/social-media" element={SocialMedia} />
        <Route path="/social-media-campaigns" element={SocialMediaCampaigns} />
        <Route path="/solana-validator-setup" element={SolanaValidatorSetup} />
        <Route path="/sort-options" element={SortOptions} />
        <Route path="/speech-to-text" element={SpeechToText} />
        <Route path="/spin-wheel" element={SpinWheel} />
        <Route path="/sponsorships" element={Sponsorships} />
        <Route path="/stake-delegation" element={StakeDelegation} />
        <Route path="/staking-dashboard" element={StakingDashboard} />
        <Route path="/staking-hub" element={StakingHub} />
        <Route path="/staking-options" element={StakingOptions} />
        <Route path="/staking-portal" element={StakingPortal} />
        <Route path="/startup-section" element={StartupSection} />
        <Route path="/statistics-panel" element={StatisticsPanel} />
        <Route path="/status" element={Status} />
        <Route path="/stepper-wizard" element={StepperWizard} />
        <Route path="/stock-chart" element={StockChart} />
        <Route path="/stock-search" element={StockSearch} />
        <Route path="/stories" element={Stories} />
        <Route path="/stream-analytics" element={StreamAnalytics} />
        <Route path="/stream-clip" element={StreamClip} />
        <Route path="/stream-gifting" element={StreamGifting} />
        <Route path="/streaming-dashboard" element={StreamingDashboard} />
        <Route path="/stripe-checkout" element={StripeCheckout} />
        <Route path="/stripe-integration" element={StripeIntegration} />
        <Route path="/student-progress" element={StudentProgress} />
        <Route path="/style-selector" element={StyleSelector} />
        <Route path="/subscriber-management" element={SubscriberManagement} />
        <Route path="/subscription-management" element={SubscriptionManagement} />
        <Route path="/subscription-plans" element={SubscriptionPlans} />
        <Route path="/subscription-setup" element={SubscriptionSetup} />
        <Route path="/subscriptions" element={Subscriptions} />
        <Route path="/success-dialog" element={SuccessDialog} />
        <Route path="/success-screen" element={SuccessScreen} />
        <Route path="/support-metrics" element={SupportMetrics} />
        <Route path="/support-ticket" element={SupportTicket} />
        <Route path="/swap-interface" element={SwapInterface} />
        <Route path="/swipe-interface" element={SwipeInterface} />
        <Route path="/synthetics" element={Synthetics} />
        <Route path="/system-architecture" element={SystemArchitecture} />
        <Route path="/system-logs" element={SystemLogs} />
        <Route path="/system-monitoring" element={SystemMonitoring} />
        <Route path="/system-observability" element={SystemObservability} />
        <Route path="/system-settings" element={SystemSettings} />
        <Route path="/system-status" element={SystemStatus} />
        <Route path="/tabs-navigation" element={TabsNavigation} />
        <Route path="/task-automation" element={TaskAutomation} />
        <Route path="/task-detail" element={TaskDetail} />
        <Route path="/task-list" element={TaskList} />
        <Route path="/tax-documentation" element={TaxDocumentation} />
        <Route path="/tax-planning" element={TaxPlanning} />
        <Route path="/tax-reporting" element={TaxReporting} />
        <Route path="/tax-reports" element={TaxReports} />
        <Route path="/teaching-opportunities" element={TeachingOpportunities} />
        <Route path="/team-management" element={TeamManagement} />
        <Route path="/team-workspace" element={TeamWorkspace} />
        <Route path="/technical-indicators" element={TechnicalIndicators} />
        <Route path="/telegram-integration" element={TelegramIntegration} />
        <Route path="/template-library" element={TemplateLibrary} />
        <Route path="/terms-acceptance" element={TermsAcceptance} />
        <Route path="/terms-of-service" element={TermsOfService} />
        <Route path="/testing-framework" element={TestingFramework} />
        <Route path="/text-input-form" element={TextInputForm} />
        <Route path="/text-to-speech" element={TextToSpeech} />
        <Route path="/text-tools" element={TextTools} />
        <Route path="/theme-settings" element={ThemeSettings} />
        <Route path="/thread-management" element={ThreadManagement} />
        <Route path="/ticket-assignment" element={TicketAssignment} />
        <Route path="/ticket-detail" element={TicketDetail} />
        <Route path="/ticket-queue" element={TicketQueue} />
        <Route path="/tier-comparison" element={TierComparison} />
        <Route path="/time-input-form" element={TimeInputForm} />
        <Route path="/time-picker-dialog" element={TimePickerDialog} />
        <Route path="/time-tracking" element={TimeTracking} />
        <Route path="/timeline-view" element={TimelineView} />
        <Route path="/timeout-error" element={TimeoutError} />
        <Route path="/tip-jar" element={TipJar} />
        <Route path="/toast-notifications" element={ToastNotifications} />
        <Route path="/today-section" element={TodaySection} />
        <Route path="/todo-list" element={TodoList} />
        <Route path="/toggle-switch-form" element={ToggleSwitchForm} />
        <Route path="/token-dashboard" element={TokenDashboard} />
        <Route path="/token-governance" element={TokenGovernance} />
        <Route path="/token-information" element={TokenInformation} />
        <Route path="/token-metrics" element={TokenMetrics} />
        <Route path="/tokenomics-calculator" element={TokenomicsCalculator} />
        <Route path="/tor-bridge" element={TorBridge} />
        <Route path="/tournament-bracket" element={TournamentBracket} />
        <Route path="/tournament-brackets" element={TournamentBrackets} />
        <Route path="/tournaments" element={Tournaments} />
        <Route path="/trade-history" element={TradeHistory} />
        <Route path="/trading" element={Trading} />
        <Route path="/trading-bots" element={TradingBots} />
        <Route path="/trading-history" element={TradingHistory} />
        <Route path="/trading-terminal" element={TradingTerminal} />
        <Route path="/transaction-explorer" element={TransactionExplorer} />
        <Route path="/transaction-history" element={TransactionHistory} />
        <Route path="/transaction-viewer" element={TransactionViewer} />
        <Route path="/transcription-manager" element={TranscriptionManager} />
        <Route path="/translation-enabled-community" element={TranslationEnabledCommunity} />
        <Route path="/translation-enabled-social-feed" element={TranslationEnabledSocialFeed} />
        <Route path="/transparency-reports" element={TransparencyReports} />
        <Route path="/travel-blog" element={TravelBlog} />
        <Route path="/travel-budget" element={TravelBudget} />
        <Route path="/travel-documents" element={TravelDocuments} />
        <Route path="/travel-photos" element={TravelPhotos} />
        <Route path="/travel-reviews" element={TravelReviews} />
        <Route path="/travel-tips" element={TravelTips} />
        <Route path="/treasury-management" element={TreasuryManagement} />
        <Route path="/trend-analysis" element={TrendAnalysis} />
        <Route path="/trending" element={Trending} />
        <Route path="/trending-content" element={TrendingContent} />
        <Route path="/trending-items" element={TrendingItems} />
        <Route path="/trending-topics" element={TrendingTopics} />
        <Route path="/triggers-actions" element={TriggersActions} />
        <Route path="/trip-planner" element={TripPlanner} />
        <Route path="/trump-mining" element={TrumpMining} />
        <Route path="/trust-safety-dashboard" element={TrustSafetyDashboard} />
        <Route path="/trust-system" element={TrustSystem} />
        <Route path="/two-factor-auth" element={TwoFactorAuth} />
        <Route path="/two-factor-setup" element={TwoFactorSetup} />
        <Route path="/typing-indicators" element={TypingIndicators} />
        <Route path="/unhidden-interface" element={UnhiddenInterface} />
        <Route path="/unhidden-mode" element={UnhiddenMode} />
        <Route path="/unified-feed" element={UnifiedFeed} />
        <Route path="/unified-identity" element={UnifiedIdentity} />
        <Route path="/unified-messaging" element={UnifiedMessaging} />
        <Route path="/unified-payment-ledger" element={UnifiedPaymentLedger} />
        <Route path="/unified-platform-dashboard" element={UnifiedPlatformDashboard} />
        <Route path="/unified-wallet" element={UnifiedWallet} />
        <Route path="/universal-search" element={UniversalSearch} />
        <Route path="/updated-landing-page" element={UpdatedLandingPage} />
        <Route path="/upgrade-downgrade-plan" element={UpgradeDowngradePlan} />
        <Route path="/upscaling" element={Upscaling} />
        <Route path="/user-activity" element={UserActivity} />
        <Route path="/user-behavior" element={UserBehavior} />
        <Route path="/user-bio" element={UserBio} />
        <Route path="/user-directory" element={UserDirectory} />
        <Route path="/user-discovery" element={UserDiscovery} />
        <Route path="/user-management" element={UserManagement} />
        <Route path="/user-mentions" element={UserMentions} />
        <Route path="/user-onboarding" element={UserOnboarding} />
        <Route path="/user-permissions" element={UserPermissions} />
        <Route path="/user-profile" element={UserProfile} />
        <Route path="/user-profiles" element={UserProfiles} />
        <Route path="/user-reputation" element={UserReputation} />
        <Route path="/user-search" element={UserSearch} />
        <Route path="/user-stats" element={UserStats} />
        <Route path="/user-suggestions" element={UserSuggestions} />
        <Route path="/user-timeline" element={UserTimeline} />
        <Route path="/v-o-d-archive" element={VODArchive} />
        <Route path="/validator-performance" element={ValidatorPerformance} />
        <Route path="/validator-setup" element={ValidatorSetup} />
        <Route path="/vendor-analytics" element={VendorAnalytics} />
        <Route path="/vendor-directory" element={VendorDirectory} />
        <Route path="/vendor-onboarding" element={VendorOnboarding} />
        <Route path="/vendor-performance" element={VendorPerformance} />
        <Route path="/vendor-verification" element={VendorVerification} />
        <Route path="/venue-management" element={VenueManagement} />
        <Route path="/verification" element={Verification} />
        <Route path="/verification-steps" element={VerificationSteps} />
        <Route path="/verification-system" element={VerificationSystem} />
        <Route path="/version-management" element={VersionManagement} />
        <Route path="/vesting-schedule" element={VestingSchedule} />
        <Route path="/video-area" element={VideoArea} />
        <Route path="/video-call" element={VideoCall} />
        <Route path="/video-chat" element={VideoChat} />
        <Route path="/video-editor" element={VideoEditor} />
        <Route path="/video-player" element={VideoPlayer} />
        <Route path="/video-tools" element={VideoTools} />
        <Route path="/video-tutorials" element={VideoTutorials} />
        <Route path="/video-upload" element={VideoUpload} />
        <Route path="/video-uploader" element={VideoUploader} />
        <Route path="/viewer-metrics" element={ViewerMetrics} />
        <Route path="/virtual-tour" element={VirtualTour} />
        <Route path="/voice-cloning" element={VoiceCloning} />
        <Route path="/voice-commands" element={VoiceCommands} />
        <Route path="/voice-commands-registry" element={VoiceCommandsRegistry} />
        <Route path="/voice-messages" element={VoiceMessages} />
        <Route path="/walkthrough-page" element={WalkthroughPage} />
        <Route path="/wallet" element={Wallet} />
        <Route path="/wallet-connect" element={WalletConnect} />
        <Route path="/wallet-integration" element={WalletIntegration} />
        <Route path="/wallet-overview" element={WalletOverview} />
        <Route path="/warning-dialog" element={WarningDialog} />
        <Route path="/watch-earn" element={WatchEarn} />
        <Route path="/watch-list" element={WatchList} />
        <Route path="/wealth-simulator" element={WealthSimulator} />
        <Route path="/web3-auth" element={Web3Auth} />
        <Route path="/webhook-management" element={WebhookManagement} />
        <Route path="/webhook-manager" element={WebhookManager} />
        <Route path="/webhooks" element={Webhooks} />
        <Route path="/welcome-screen" element={WelcomeScreen} />
        <Route path="/whale-monitor" element={WhaleMonitor} />
        <Route path="/whitelist-management" element={WhitelistManagement} />
        <Route path="/wishlist-management" element={WishlistManagement} />
        <Route path="/workflow-automation" element={WorkflowAutomation} />
        <Route path="/workflow-builder" element={WorkflowBuilder} />
        <Route path="/world-brain" element={WorldBrain} />
        <Route path="/world-simulation-control" element={WorldSimulationControl} />
        <Route path="/yield-farming" element={YieldFarming} />
        <Route path="/zapier-integration" element={ZapierIntegration} />
        <Route path="/zero-knowledge-proof" element={ZeroKnowledgeProof} />
        <Route path="/shared" element={shared} />
              
              {/* Catch-all for 404 */}
              <Route path="/:rest*" component={NotFound} />
            </Suspense>
          </Router>
          <Toaster />
        </ThemeProvider>
      </TRPCProvider>
    </ErrorBoundary>
  );
}
