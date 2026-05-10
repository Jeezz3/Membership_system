class MembersRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ in ['Members', 'Membership','Schedule']:
            return 'members'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ in ['Members', 'Membership','Schedule']:
            return 'members'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        # allow relations between Members and Membership since they share the same DB
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            if obj1.__class__.__name__ in ['Members', 'Membership','Schedule'] and obj2.__class__.__name__ in ['Members', 'Membership','Schedule']:
                return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api' and model_name in ['Members', 'Membership','Schedule']:
            return db == 'members'
        return None