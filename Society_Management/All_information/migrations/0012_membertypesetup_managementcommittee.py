# Generated by Django 5.1.2 on 2024-10-25 09:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('All_information', '0011_billssetup'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberTypeSetup',
            fields=[
                ('member_type_id', models.AutoField(primary_key=True, serialize=False)),
                ('member_type_name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ManagementCommittee',
            fields=[
                ('mc_id', models.AutoField(primary_key=True, serialize=False)),
                ('mc_name', models.CharField(max_length=200)),
                ('mc_guardian_type', models.CharField(blank=True, choices=[('S/O', 'Son of'), ('D/O', 'Daughter of'), ('W/O', 'Wife of')], max_length=255, null=True)),
                ('mc_guardian_name', models.CharField(blank=True, max_length=255, null=True)),
                ('mc_email', models.EmailField(max_length=200)),
                ('mc_contact', models.CharField(max_length=200)),
                ('mc_pre_address', models.CharField(max_length=500)),
                ('mc_per_address', models.CharField(max_length=500)),
                ('mc_cnic', models.CharField(max_length=200)),
                ('mc_joining_date', models.CharField(max_length=200)),
                ('mc_ending_date', models.CharField(max_length=200)),
                ('mc_status', models.IntegerField(default=0)),
                ('mc_image', models.CharField(blank=True, max_length=200, null=True)),
                ('mc_password', models.CharField(max_length=200)),
                ('mc_member_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='All_information.membertypesetup')),
            ],
        ),
    ]
