# Generated by Django 5.0 on 2023-12-12 17:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("apigateway", "0004_alter_assignment_deadline"),
    ]

    operations = [
        migrations.AddField(
            model_name="assignment",
            name="AssignmentName",
            field=models.CharField(default="Sample Assignment", max_length=100),
        ),
        migrations.AlterField(
            model_name="assignment",
            name="Deadline",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 12, 19, 17, 1, 38, 63074, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
