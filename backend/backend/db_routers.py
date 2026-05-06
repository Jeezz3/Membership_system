class MembersRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'api':
            if model.__name__ in ['Members']:
                return 'members'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'api':
            if model.__name__ in ['Members']:
                return 'members'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            if (obj1.__class__.__name__ in ['Members'] and obj2.__class__.__name__ in ['Members']):
                return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api':
            if model_name in ['members']:
                return db == 'members'
        return None

class MembershipRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'api':
            if model.__name__ in ['Membership']:
                return 'membership'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'api':
            if model.__name__ in ['Membership']:
                return 'membership'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'api' and obj2._meta.app_label == 'api':
            if (obj1.__class__.__name__ in ['Membership'] and obj2.__class__.__name__ in ['Membership']):
                return True
        return None
    
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'api':
            if model_name in ['membership']:
                return db == 'membership'
        return None