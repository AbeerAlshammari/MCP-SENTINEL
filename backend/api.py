import fastapi # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]

from server import (
SCENARIOS,
simulate_attack,
check_indicator,
analyze_security_event,
get_defense_recommendations
)

# Initialize FastAPI

app = fastapi.FastAPI(
title="MCP SENTINEL API",
description="Educational MCP Security Simulator API",
version="1.0.0"
)

# Enable CORS

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"]
)

# ==============================

# HOME

# ==============================

@app.get("/")
def home():
 return {
"message": "MCP SENTINEL API is running",
"status": "online"
}

# ==============================

# SECURITY SCENARIOS

# ==============================

@app.get("/api/scenarios")
def scenarios():
 return SCENARIOS

# ==============================

# SIMULATION

# ==============================

@app.post("/api/simulate")
def simulate(data: dict):
 return simulate_attack(
data.get("scenario", "")
)

# ==============================

# INDICATOR CHECK

# ==============================

@app.post("/api/check")
def check(data: dict):
 return check_indicator(
data.get("text", "")
)

# ==============================

# THREAT ANALYSIS

# ==============================

@app.post("/api/analyze")
def analyze(data: dict):
    return analyze_security_event(data.get("event", ""))
# ==============================

# DEFENSE RECOMMENDATIONS

# ==============================

@app.post("/api/defense")
def defense(data: dict):
 return get_defense_recommendations(
data.get("category", "")
)
