"""Incomplete teaching boundary; intentionally does not call a gateway."""

ALLOWED_MODEL_ALIASES = frozenset({"testus-synthetic-chat"})


def validate_model_alias(alias: str) -> None:
    if alias not in ALLOWED_MODEL_ALIASES:
        raise ValueError("model alias is not approved")


def validate_credentials(api_key: str) -> None:
    if not api_key or "\n" in api_key:
        raise ValueError("synthetic credential is missing or malformed")
    # Gateway destination and transport are intentionally left to the
    # accepted platform contract. Never accept a learner-controlled URL here.
    raise NotImplementedError("gateway integration is pending platform acceptance")
