from fastapi import FastAPI

from routes import PatientRoute

app = FastAPI()

# include the PatientRoute to handle /patients/* endpoints
# listed endpoints in /routes/PatientRoute.py:3

app.include_router(PatientRoute.patient_router)


@app.get("/")
def read_root():
    return {"paths": ["/patients/", "/patients/add", "/patients/{id}", "/patients/{id}/update/"]}
