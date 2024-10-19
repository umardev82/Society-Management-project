# Generated by Django 5.1.2 on 2024-10-19 09:04

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0003_amenity_propertytype_unittype_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('owner_id', models.AutoField(primary_key=True, serialize=False)),
                ('owner_name', models.CharField(max_length=200)),
                ('owner_guardian_name', models.CharField(blank=True, max_length=200, null=True)),
                ('owner_profile_picture', models.ImageField(blank=True, null=True, upload_to='owner_profile_pictures/')),
                ('owner_phone_number', models.CharField(max_length=15)),
                ('password', models.CharField(max_length=128)),
                ('owner_email', models.EmailField(max_length=254, unique=True)),
                ('owner_membership_number', models.CharField(blank=True, max_length=50, null=True)),
                ('owner_cnic', models.CharField(max_length=15, unique=True)),
                ('owner_address', models.CharField(blank=True, max_length=255, null=True)),
                ('owner_city', models.CharField(blank=True, max_length=255, null=True)),
                ('owner_country', models.CharField(blank=True, max_length=255, null=True)),
                ('document_attachment', models.FileField(blank=True, null=True, upload_to='owner_documents/')),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('service_id', models.AutoField(primary_key=True, serialize=False)),
                ('service_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='property_info',
            name='document_attachment',
            field=models.FileField(blank=True, null=True, upload_to='documents/'),
        ),
        migrations.AddField(
            model_name='property_info',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='property_info',
            name='is_rented',
            field=models.BooleanField(choices=[(True, 'Yes'), (False, 'No')], default=False),
        ),
        migrations.AddField(
            model_name='property_info',
            name='status',
            field=models.CharField(blank=True, choices=[('Available', 'Available'), ('Rented', 'Rented'), ('Maintenance Pending ', 'Maintenance Pending')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='propertytype',
            name='joint_number',
            field=models.IntegerField(blank=True, help_text='Select the joint number (0, 1, 2, 3, 4) or leave empty if not applicable', null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)]),
        ),
        migrations.AddField(
            model_name='property_info',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='properties', to='All_information.owner'),
        ),
        migrations.CreateModel(
            name='OwnerProperty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='owner_properties', to='All_information.owner')),
                ('property_info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='All_information.property_info')),
            ],
            options={
                'unique_together': {('owner', 'property_info')},
            },
        ),
    ]
