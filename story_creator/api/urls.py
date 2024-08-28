from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('token/', MyTokens.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('register/', RegisterView.as_view()),
    path('dashboard/', DashboardView),
    path('api/user-profile/', user_profile, name='user-profile'),
    # Story URLs
    path('api/stories/', StoryListCreateView.as_view(), name='story-list-create'),
    path('api/stories/<int:pk>/', StoryRetrieveUpdateDestroyView.as_view(), name='story-detail'),
    # path('api/stories/<slug:slug>/', StoryRetrieveUpdateDestroyView.as_view(), name='story-detail'),
    
    # Contribution URLs
    path('api/contributions/', ContributionListCreateView.as_view(), name='contribution-list-create'),
    path('api/contributions/<int:pk>/', ContributionRetrieveUpdateDestroyView.as_view(), name='contribution-detail'),
    path('api/contact/', contact_view, name='contact'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
