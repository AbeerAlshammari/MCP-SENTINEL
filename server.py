from mcp.server.fastmcp import FastMCP

mcp = FastMCP("MCP SENTINEL")

SCENARIOS = {
    "prompt_injection": "HIGH",
    "unauthorized_access": "CRITICAL",
    "data_exposure": "MEDIUM"
}


# =========================
# MCP TOOLS
# =========================

@mcp.tool()
def list_scenarios():
    """List all security scenarios."""
    return SCENARIOS


@mcp.tool()
def simulate_attack(scenario: str):
    """Run a safe educational security simulation."""

    if scenario not in SCENARIOS:
        return {"error": "Unknown scenario"}

    return {
        "scenario": scenario,
        "severity": SCENARIOS[scenario],
        "simulation_only": True,
        "result": "Simulation completed. No real attack performed."
    }


@mcp.tool()
def check_indicator(text: str):
    """Check text for security indicators."""

    words = [
        "prompt injection",
        "unauthorized",
        "sensitive data"
    ]

    found = [
        word for word in words
        if word in text.lower()
    ]

    return {
        "detected": bool(found),
        "indicators": found
    }


@mcp.tool()
def analyze_security_event(event: str):
    """Analyze a simulated security event."""

    event_lower = event.lower()

    if "prompt" in event_lower or "injection" in event_lower:
        return {
            "threat": "Prompt Injection",
            "severity": "HIGH",
            "indicators": ["Suspicious instructions"],
            "explanation": "Possible prompt manipulation detected.",
            "recommendation": "Validate inputs and treat external content as untrusted.",
            "confirmed_vulnerability": False
        }

    if "unauthorized" in event_lower or "access" in event_lower:
        return {
            "threat": "Unauthorized Tool Access",
            "severity": "CRITICAL",
            "indicators": ["Unauthorized access attempt"],
            "explanation": "Possible unauthorized tool access.",
            "recommendation": "Apply authentication and least privilege.",
            "confirmed_vulnerability": False
        }

    if "data" in event_lower or "exposure" in event_lower:
        return {
            "threat": "Sensitive Data Exposure",
            "severity": "MEDIUM",
            "indicators": ["Sensitive data reference"],
            "explanation": "Possible sensitive data exposure.",
            "recommendation": "Filter outputs and restrict data access.",
            "confirmed_vulnerability": False
        }

    return {
        "threat": "Unknown",
        "severity": "LOW",
        "indicators": [],
        "explanation": "No known threat pattern detected.",
        "recommendation": "Continue monitoring.",
        "confirmed_vulnerability": False
    }


@mcp.tool()
def get_defense_recommendations(category: str):
    """Get security defense recommendations."""

    recommendations = {
        "prompt_injection": [
            "Validate all user inputs.",
            "Treat external content as untrusted.",
            "Separate system instructions from user content."
        ],
        "unauthorized_access": [
            "Apply authentication and authorization.",
            "Use least-privilege permissions.",
            "Monitor tool access."
        ],
        "data_exposure": [
            "Filter sensitive information.",
            "Restrict access to confidential resources.",
            "Avoid exposing secrets."
        ]
    }

    return {
        "category": category,
        "recommendations": recommendations.get(
            category,
            ["Use input validation and access control."]
        )
    }


# =========================
# MCP RESOURCES
# =========================

@mcp.resource("sentinel://overview")
def overview():
    """MCP SENTINEL overview."""
    return "MCP SENTINEL is an educational security simulator."


@mcp.resource("sentinel://defense")
def defense():
    """Security defense guide."""
    return "Use input validation, least privilege, access control and output filtering."


# =========================
# MCP PROMPTS
# =========================

@mcp.prompt()
def analyze_threat(threat: str):
    """Analyze a security threat."""
    return f"Analyze this threat: {threat}. Explain severity and defenses."


@mcp.prompt()
def explain_concept(concept: str):
    """Explain a security concept."""
    return f"Explain {concept} in Arabic with an example and prevention methods."


# =========================
# START MCP SERVER
# =========================

if __name__ == "__main__":
    mcp.run(transport="stdio")