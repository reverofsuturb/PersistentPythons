const GET_ALL_LISTS = "lists/getAllLists"
const GET_LIST = "lists/getList"

const getAllLists = (list) => ({
    type: GET_ALL_LISTS,
    list
})


export const thunkGetAllLists = () => async(dispatch) => {
    const res = await fetch('/api/lists')
    if (res.ok) {
        const data = await res.json();

        if(data.errors){
            return data.errors
        }

        dispatch(getAllLists(data))

    }
}

const initialState = {}

function listReducer(state = initialState, action) {
    switch (action.type){
        case GET_ALL_LISTS:
            let listState = {}
            action.list.List.forEach((list) => {
                listState[list.id] = list;
            });
            return listState

    }
}

export default listReducer
