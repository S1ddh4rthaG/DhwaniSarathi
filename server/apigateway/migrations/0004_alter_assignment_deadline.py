# Generated by Django 5.0 on 2023-12-12 16:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("apigateway", "0003_rename_username_user_username_user_age_user_gender"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assignment",
            name="Deadline",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 12, 19, 16, 53, 37, 539807, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
