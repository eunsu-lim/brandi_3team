class ErrorFormat(Exception):
    def __init__(self,code):
        self.code = code

class DuplicatedDataError(ErrorFormat):
    pass

class InvalidDataError(ErrorFormat):
    pass

class NotFoundError(ErrorFormat):
    pass

class PasswordError(ErrorFormat):
    pass

class OutofStockError(ErrorFormat):
    pass

class PriceDoesNotMatchError(ErrorFormat):
    pass

class InvalidSalesQuantityError(ErrorFormat):
    pass