from typing import Union

from fastapi import APIRouter

# current endpoints:
# [:POST]   /patients/
# [:GET]    /patients/
# [:GET]    /patients/find?name=bob
# [:POST]   /patients/create
# [:GET]    /patients/{id}/profile
# [:POST]   /patients/{id}/update

patient_router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@patient_router.post("/create")
async def create_patient():
    return {"not": "Implemented yet"}


@patient_router.get("/{id}/profile")
async def read_patient(id: int):
    return {"id": id}


@patient_router.post("/{id}/update")
async def update_patient(id: int):
    return {"id": id}


@patient_router.delete("/{id}/delete")
async def delete_patient(_id: str):
    return {"id": _id}


@patient_router.get("/find")
async def find_user_by_name(name: Union[str, None] = None):
    return {"id": "1"}


# todo: loop through crud and count entries
@patient_router.get("/count")
async def count_patients():
    return {"count": 0}
