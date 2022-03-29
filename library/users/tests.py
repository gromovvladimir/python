from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from TODO.models import Todo
from .models import CustomUser
from .views import CustomUserViewSet


class TestUserApi(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'maksim', 'first_name': 'maksim', 'last_name': 'ivanov',
                                               'email': 'maks@localhost.ru'}, format='json')
        admin = CustomUser.objects.create_superuser('vladimir', 'grom@rambler.ru', '16fgh1986')
        force_authenticate(request, admin)
        view = CustomUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestUserApiClient(TestCase):
    def test_get_detail(self):
        client = APIClient()
        user = CustomUser.objects.create(username='ivan', first_name='ivan', last_name='Gromov',
                                         email='ivan@localhost.ru')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUser(APITestCase):
    def setUp(self) -> None:
        CustomUser.objects.create(username='ivan', first_name='ivan', last_name='Gromov', email='ivan@localhost.ru')
        self.admin = CustomUser.objects.create_superuser('vladimir', email='grom@rambler.ru', password='16fgh1986')

    def test_get_list(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUser2(APITestCase):
    def setUp(self) -> None:
        self.user = mixer.blend(CustomUser, age=20)
        self.todo = mixer.blend(Todo, todo_user__age=22)
        self.admin = CustomUser.objects.create_superuser('vladimir', email='grom@rambler.ru', password='16fgh1986')

    def test_get_list2(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)







