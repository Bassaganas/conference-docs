from provider_stub import validate_model_alias


def test_allowlisted_alias_is_accepted():
    validate_model_alias("testus-synthetic-chat")


def test_unknown_alias_is_rejected():
    try:
        validate_model_alias("unapproved-direct-model")
    except ValueError as error:
        assert "approved" in str(error)
    else:
        raise AssertionError("unknown alias must fail")
