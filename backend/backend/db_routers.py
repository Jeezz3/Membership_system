class MembersRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ == 'Members':
            return 'members'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ == 'Members':
            return 'members'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api' and model_name == 'members':
            return db == 'members'
        return None


class MembershipRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ == 'Membership':
            return 'membership'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'api' and model.__name__ == 'Membership':
            return 'membership'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api' and model_name == 'membership':
            return db == 'membership'
        return None
