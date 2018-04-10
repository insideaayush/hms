from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin

# admin.site.register(Tag)
# admin.site.register(Category)
# admin.site.register(Post)

# admin.site.register(User)

@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('__str__', 'username', 'email', 'is_patient', 'is_doctor', 'is_clinic')
    fieldsets = UserAdmin.fieldsets + (("Account Type", {
        'fields': ('is_patient', 'is_doctor', 'is_clinic',)
    }), )


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'mobile', 'has_subscription', 'gender', 'joined_on', 'last_updated_on')

@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'address', 'joined_on', 'last_updated_on')
    pass

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'available_at', 'specialization', 'description', 'display_all_clinics', 'joined_on', 'last_updated_on')
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('booking_id', 'book_by', 'doctor', 'location', 'status', 'created_on', 'last_updated_on')
    pass

@admin.register(DirectCarePlan)
class DirectCarePlanAdmin(admin.ModelAdmin):
    list_display = ('kind',)
    pass

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('kind', 'patient', 'active', 'created_on', 'last_updated_on')
    pass
