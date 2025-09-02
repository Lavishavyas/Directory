from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages  # ✅ Added for pop-up messages
import json
from .models import BusinessRequest  # Ensure this model is defined in models.py
from django.contrib import messages
from django.shortcuts import render, redirect

def submit_business_request(request):
    if request.method == 'POST':
        # handle and save your form data here

        # ✅ Show success message
        messages.success(request, 'Request sent successfully!')

        return redirect('/')  # redirect to home or any page
    else:
        return render(request, 'some_template.html')  # fallback GET response


# ----------- Template Views (Render HTML Pages) -----------

def home(request):
    return render(request, 'welcomepage.html')

def logout_view(request):
    logout(request)
    return redirect('index')  # Make sure you have a URL named 'index'

def welcomepage(request):
    return render(request, 'welcomepage.html')

def index(request):
    return render(request, 'index.html')

def index3(request):  # Login page
    return render(request, 'index3.html')

def index4(request):  # Signup page
    return render(request, 'index4.html')

def chatbot(request):
    return render(request, 'chatbot.html')


# ----------- Signup API -----------

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            username = data.get('username', '').strip()
            email = data.get('email', '').strip().lower()
            password = data.get('password', '')

            if not username or not email or not password:
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already registered'}, status=400)

            # Create and save the user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({'message': 'User created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Server error: ' + str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ----------- Login API -----------

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            email = data.get('email', '').strip().lower()
            password = data.get('password', '')

            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(request, username=user_obj.username, password=password)

                if user is not None:
                    login(request, user)
                    return JsonResponse({'message': 'Login successful'})
                else:
                    return JsonResponse({'error': 'Invalid email or password'}, status=400)

            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'Server error: ' + str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# ----------- Business Request Submission -----------

@require_POST
@login_required
def submit_business_request(request):
    business_name = request.POST.get('guest_business', '').strip()
    address = request.POST.get('guest_address', '').strip()
    contact = request.POST.get('guest_contact', '').strip()
    website = request.POST.get('guest_website', '').strip()

    if not business_name or not address or not contact:
        return JsonResponse({'error': 'All fields except website are required.'}, status=400)

    # Save request in DB
    BusinessRequest.objects.create(
        user=request.user,
        business_name=business_name,
        address=address,
        contact=contact,
        website=website
    )

    # Optional: Email site admin
    send_mail(
        subject='New Business Request Submitted',
        message=f"User {request.user.username} submitted a request:\n\n"
                f"Business Name: {business_name}\n"
                f"Address: {address}\n"
                f"Contact: {contact}\n"
                f"Website: {website or 'N/A'}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.ADMIN_EMAIL],
        fail_silently=True
    )

    # ✅ Show success popup message
    messages.success(request, 'Request sent successfully!')

    return redirect('index')  # Or render a thank-you page
