# Generated by Django 5.1.2 on 2024-10-25 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0014_alter_managementcommittee_mc_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='managementcommittee',
            name='mc_image',
            field=models.ImageField(blank=True, null=True, upload_to='M_C_profiles/'),
        ),
    ]