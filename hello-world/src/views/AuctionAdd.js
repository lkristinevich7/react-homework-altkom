import React, { useReducer, Reducer } from "react"
import Opener from "../components/Opener"

// type Props = {}
// type State = {
//   auction: {
//     name: string;
//     total: number;
//     descr: string
//   };
//   photos: {
//     id: number,
//     title: string,
//     image: string,
//     uploaded?: boolean,
//     error?: any
//   }[],
//   promo: { type: string, cost: number }[],
//   costTotal: number
// }
// type Actions = { type: string } & any

export const photoReducer = (state, action) => {
  switch (action.type) {
    case 'PHOTO_ADD': return [...state, {
      id: action.payload.file.name,
      title: action.payload.file.name,
      image: action.payload.previewUrl
    }]
    case 'PHOTO_REMOVE': return state.filter(p => p.id !== action.payload.id)
    case 'PHOTO_UPDATE': return state.map(p => p.id !== action.payload.id ? p : {
      ...p, image: action.payload.image
    })
    default:
      return state
  }
}

export const promoReducer = (state, action) => {
  switch (action.type) {
    case 'PROMO_ADD': return [...state.filter(p => p.type != action.payload.type), action.payload]
    case 'PROMO_REMOVE': return state.filter(p => p.type !== action.payload.type)
    default:
      return state
  }
}

export const reducer = (state, action) => {
  state = {
    ...state,
    photos: photoReducer(state.photos, action),
    promo: promoReducer(state.promo, action)
  };

  state.costTotal = state.promo.reduce((sum, p) => sum += p.cost, 0)

  switch (action.type) {
    case 'UPDATE_AUCTION': return { ...state, auction: { ...state.auction, ...action.payload } }
    case 'RESET': return { ...state, auction: { name: '', total: 0, descr: '' } }
    default: return state
  }

}

const initialState = {
  auction: {
    name: 'Placki ', total: 0, descr: ''
  },
  photos: [],
  promo: [],
  costTotal: 0,
}

const actions = {
  reset: () => ({ type: 'RESET' }),
  update: (payload) => ({ type: 'UPDATE_AUCTION', payload }),
  promoAdd: (type) => {
    switch (type) {
      case 'HIGHLIGHT': return ({ type: 'PROMO_ADD', payload: { type, cost: 10 } });
      case 'TOP_RESULTS': return ({ type: 'PROMO_ADD', payload: { type, cost: 100 } });
    }
  }
  , promoRemove(type) { return ({ type: 'PROMO_REMOVE', payload: { type } }) },

  addFile(payload) {
    return ({
      type: 'PHOTO_ADD',
      payload: payload
    })
  },

  updateFile(payload) {
    return ({
      type: 'PHOTO_UPDATE',
      payload: {
        id: payload.id,
        image: 'http://localhost:9000' + payload.image
      }
    })
  },

  submit(state, dispatch) {
    fetch('http://localhost:9000/products', {
      method: 'POST', headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }, body: JSON.stringify({
        "title": state.auction.name,
        "descr": state.auction.descr,
        "price": state.auction.total,
        "image": state.photos[0] ? state.photos[0].image : "https://i.picsum.photos/id/36/200/200.jpg"
      })
    })

    // dispatch({ type: '???' })
  }
}

const AuctionAddView = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  function uploadPhoto(event) {
    const file = event.target.files[0];
    const previewUrl = URL.createObjectURL(file)
    dispatch(actions.addFile({ file, previewUrl }))

    const form = new FormData()
    form.append('auctionimage', file)
    // type uploadData = {
    //   url: string;
    //   name: string;
    //   mimetype: string;
    //   size: number;
    // }


    fetch('http://localhost:9000/upload', {
      method: 'POST',
      body: form,
      //https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    }).then(r => r.json())
      .then(resp => {
        const data = (resp.data )
        dispatch(actions.updateFile({
          id: data.name,
          image: data.url
        }));
      })

    /// upload
    ///   dispatch( uploadSuccess )
    ///   dispatch( uploadFail )
  }

  return (
    <div>
      <div>
        <div className="row">
          <div className="col">
            <h1>Auction Add</h1>

            <pre>{JSON.stringify(state, null, 2)}</pre>

            <Opener title="Auction" opened={true} >
              <input type="text" value={state.auction.name} onChange={e => dispatch(actions.update({ name: e.target.value }))} />
            </Opener>


            <Opener title="Photos" opened={true} >
              <div>
                {state.photos.map(photo => <span>
                  <img src={photo.image} style={{ width: '200px', height: '200px', objectFit: 'cover' }} /> {photo.title}
                </span>)}
              </div>
              <input type="file" onChange={uploadPhoto}></input>

            </Opener>

            <Opener title="Promotion" opened={true} >
              <div className="list-group">
                {state.promo.map(promo => <div className="list-group-item" key={promo.type}>
                  {promo.type} {promo.cost}
                  <span onClick={() => dispatch(actions.promoRemove(promo.type))}>&times;</span>
                </div>)}
              </div>


              <h4>Koszt {state.costTotal} zl</h4>
              <button className="btn btn-info" onClick={() => dispatch(actions.promoAdd('HIGHLIGHT'))}>Dodaj wyróżnienie (10 zł)</button>
              <button className="btn btn-info" onClick={() => dispatch(actions.promoAdd('TOP_RESULTS'))}>Dodaj na górze (100 zł)</button>
            </Opener>


            <button className="btn btn-info" onClick={() => dispatch(actions.reset())}>Reset</button>
            <button className="btn btn-info" onClick={() => actions.submit(state, dispatch)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionAddView
