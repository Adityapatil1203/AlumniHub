from django.urls import path
import newApp
from . import views, alumniView, collegeView
from django.conf import settings
from django.conf.urls.static import static
from .views import role_selection_view,role_selection_success,HodPrincipalPostAPIView,GETAlumni,HodAuthorPostListView,AlumniPostAPIView,GETHODs,GETStudent,UserImageUploadView,AlumniAuthorPostListView

urlpatterns = [

    # DJ routes 
    path(
        '',
        views.home,
        name='home'
        ),    
    path(
        'collegeprofile/<int:pk>/',
        collegeView.profile,
        name="college-profile"
        ),
    path(
        'alumniprofile/<int:pk>/',
        alumniView.profile,
        name="alumni-profile"
        ),
    path(
        'showalumni/',
        views.AlumniListView,
        name="show-alumni"
        ),
    path(
        'showcolleges/',
        views.CollegeListView,
        name='show-college'
        ),
    path(
        'college/<int:pk>/',
        views.CollegeDetailView.as_view(),
        name='college-detail'
        ),
    path(
        'alumni/<int:pk>/',
        views.AlumniDetailView.as_view(),
        name="alumni-detail"
         ),
    path(
        'college/query/',
        collegeView.PendingQueryView.as_view(),
        name="pending-query"
        ),
    path(
        'authenticate/<int:pk>/',
        collegeView.AlumniAuthenticationView.as_view(),
        name="alumni-authentication"
        ),
    path('AlumniPost', views.AlumniAddPost, name='AlumniPost'),
    path('EditAlumniPost/<int:id>', views.AlumniPostEdit, name='AlumniPostupdate'),
    path('AlumniPostlist', views.AlumniPostList, name='AlumniPostlist'),
    path('AlumniPostdelete/<int:id>', views.AlumniPostDelete, name='AlumniPostdelete'),
    path('follow/<int:id>/', views.Follow, name='follow'),
    path('AlumniPosts/<str:author_username>/', views.AlumniPosts, name='AlumniPosts'),
    path('followers/<int:id>/', views.Followers, name='followers'),
    path('following/<int:id>/', views.Following, name='following'),
    path('select-role/<int:user_id>/', role_selection_view, name='role_selection'),
    path('role-selection-success/', role_selection_success, name='role_selection_success'),
  
    # DRF Routes
    # 1.HOD 
    path('hodposts/', HodPrincipalPostAPIView.as_view(), name='hod-posts'),  
    path('hodposts/<int:pk>/', HodPrincipalPostAPIView.as_view(), name='hod-post-detail'),
    path('getalumni/', GETAlumni.as_view()),  # For list or creation
    path('getalumni/<int:pk>/', GETAlumni.as_view()),  # For specific alumni operations (GET spefific user )
    path('hodposts/author/<int:author_id>/', HodAuthorPostListView.as_view(), name='author-posts'),
    path('alumniPosts/author/<int:author_id>/', AlumniAuthorPostListView.as_view(), name='author-posts'),
    path('alumni/posts/', AlumniPostAPIView.as_view(), name='alumni-post-list'),
    path('alumni/posts/<int:pk>/', AlumniPostAPIView.as_view(), name='alumni-post-detail'),
    path('hods/', GETHODs.as_view(), name='all_hods'),  # For retrieving all HODs
    path('hods/<int:pk>/', GETHODs.as_view(), name='single_hod'),  # For retrieving a specific HOD
    path('students/', GETStudent.as_view(), name='get_all_students'),
    path('students/<int:pk>/', GETStudent.as_view(), name='get_student_by_id'),
    path('edit-hod-profile/<int:pk>/', views.update_hod_profile, name='edit_hod_profile'),
    path('edit-student-profile/<int:pk>/', views.update_student_profile, name='edit_student_profile'),
    path('edit-alumni-profile/<int:pk>/', views.update_alumni_profile, name='edit_alumni_profile'),
    path('update-image/<int:user_id>/', UserImageUploadView.as_view(), name='update-image'),
   
]+static(settings.MEDIA_URL, document_root=settings. MEDIA_ROOT)    
