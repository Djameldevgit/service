import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { imageShow, videoShow } from '../utils/mediaShow';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { FormCheck } from 'react-bootstrap';
import Select from 'react-select';
import communesjson from "../json/communes.json"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';  // Importar los estilos predeterminados

import { crearPostPendiente, updatePost } from '../redux/actions/postAproveAction';
import { specifications } from './specificatio';

const StatusModal = () => {
    const { auth, theme, socket, status, } = useSelector((state) => state);


    const dispatch = useDispatch()

    const initilastate = {

        category: "Agence de Voyage",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        wilaya: "",
        commune: "",
        contacto: "",


        itemsReservations_Visa: "",
        Location_Vacances: '',
        alquilergeneral: "",
        superficie: "",
        etage: "",
        promoteurimmobilier: false,
        specifications: [],

        adress: "",
        nombredelhotel: "",
        adresshotel: "",
        totalhabitaciones: "",
        tipodehabutaciones: [],
        estrellas: "",
        wifi: [],
        language: [],
        tarifnuit: "",
        reservacionenlinea: "",
        politiqueAnnulation: "",
        hotelWebsite: "",
        horariollegada: "",



        horadudepar: "",
        datedepar: "",
        duracionviaje: "",
        transporte: "",
        destinacionvoyage1: "",
        voyage1hotel1: "",
        voyage1nombrehotel1: "",
        destinacionvoyage2: "",
        voyage2hotel2: "",
        voyage1nombrehotel2: "",
        fecharegreso: "",
        serviciosdelhotel: "",
        incluidoenelprecio: "",
        cancelarreserva: "",

        destinacionhadj: "",

    }


    const [postData, setPostData] = useState(initilastate)
    const [images, setImages] = useState([])
    const [selectedWilaya, setSelectedWilaya] = useState("");

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

    const tipodehabutaciones = [
        { label: 'Simple', value: 'Simple' },
        { label: 'Double', value: 'Double' },
        { label: 'Suite', value: 'Suite' },
        { label: 'Familiale', value: 'Familiale' },
        { label: 'Deluxe', value: 'Deluxe' },
    ];
    const language = [
        { label: 'Arabe', value: 'Arabe' },
        { label: 'Français', value: 'Français' },
        { label: 'Anglais', value: 'Anglais' },
        { label: 'kabyle', value: 'kabyle' },
        { label: 'Espagnol', value: 'Espagnol' },
        { label: 'Russe', value: 'Russe' },
    ];
    const wifi = [
        { label: 'Wifi', value: 'Wifi' },
        { label: 'Piscine', value: 'Piscine' },
        { label: 'Petit_déjeuner', value: 'Petit déjeuner' },
        { label: 'Restaurante', value: 'Restaurante' },
        { label: 'Petit_déjeuner', value: 'Petit déjeuner' },
        { label: 'Access pour discapacity', value: 'Access pour discapacity' },
        { label: 'Petit_déjeuner', value: 'Petit déjeuner' },
        { label: 'Animaux de compagniet', value: 'Animaux de compagnie' },
        { label: 'Climatisation', value: 'Climatisation' },
        { label: 'Navette_Aeroport', value: 'Navette aéroport' },
    ]

    const handleChangetipeChambres = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                tipeChambres: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };
    const tipeChambres = () => (
        <Select
            placeholder="Type chambres"
            value={tipeChambres.filter(obj => postData.tipeChambres && postData.tipeChambres.includes(obj.value))}
            options={tipeChambres}
            onChange={handleChangetipeChambres}
            isMulti={true}
            closeMenuOnSelect={false}
        />
    )
    const handlechangewifi = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                wifi: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };



    const handleChangetipodehabutaciones = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                tipodehabutaciones: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };


    const handleChangelaguage = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                language: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };




    const handleWilayaChange = (event) => {
        const selectedWilaya = event.target.value;
        setSelectedWilaya(selectedWilaya);

        // Buscar la wilaya seleccionada
        const wilayaEncontrada = communesjson.find((wilaya) => wilaya.wilaya === selectedWilaya);
        const communes = wilayaEncontrada ? wilayaEncontrada.commune : [];

        // Establecer la primera comuna disponible o vacío


        // Actualizar postData con la wilaya seleccionada
        setPostData((prevState) => ({
            ...prevState,
            wilaya: selectedWilaya,
            commune: communes.length > 0 ? communes[0] : "", // Actualizar comuna si hay una disponible
        }));
    };
    const wilayasOptions = communesjson.map((wilaya, index) => (
        <option key={index} value={wilaya.wilaya}>
            {wilaya.wilaya}
        </option>
    ));
    const communesOptions = selectedWilaya
        ? communesjson
            .find((wilaya) => wilaya.wilaya === selectedWilaya)
            ?.commune?.map((commune, index) => (
                <option key={index} value={commune}>
                    {commune}
                </option>
            ))
        : [];
    const handleCommuneChange = (event) => {
        const selectedCommune = event.target.value;

        // Actualizar postData con la comuna seleccionada
        setPostData((prevState) => ({
            ...prevState,
            commune: selectedCommune,
        }));
    };

    const handleChangeSpecifications = (selectedOptions) => {
        setPostData(prevState => ({
            ...prevState,
            attributes: {
                ...prevState.attributes,
                specifications: selectedOptions ? selectedOptions.map(option => option.value) : []
            }
        }));
    };




    const handleSelect = (selectedList) => {
        setPostData({ ...postData, specifications: selectedList });
    };

    const handleRemove = (selectedList) => {
        setPostData({ ...postData, specifications: selectedList });
    };


    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;

        setPostData(prevState => {
            const isCheckbox = type === "checkbox";

            // Verificamos si el name pertenece a attributes
            const isAttribute = prevState.attributes && Object.prototype.hasOwnProperty.call(prevState.attributes, name);

            if (isAttribute) {
                // ✅ Si el campo pertenece a attributes, actualizamos dentro de attributes
                return {
                    ...prevState,
                    attributes: {
                        ...prevState.attributes,
                        [name]: isCheckbox ? checked : value
                    }
                };
            } else {
                // ✅ Si es un campo normal, lo actualizamos directamente
                return {
                    ...prevState,
                    [name]: isCheckbox ? checked : value
                };
            }
        });
    };





    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postData.wilaya || !postData.commune) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Por favor selecciona una wilaya y una comuna." },
            });
        }
        if (images.length === 0) {
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: "Por favor agrega una foto o video." },
            });
        }

        if (status.onEdit) {
            dispatch(updatePost({ postData, images, auth, status }));
        } else {
            dispatch(crearPostPendiente({ postData, images, auth, socket }));
        }

        setPostData(initilastate);
        setImages([]);
        if (tracks) tracks.stop();
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    useEffect(() => {

        if (status?.onEdit) {
            setPostData({
                category: status.category || "",
                subCategory: status.subCategory || "",
                description: status.description || "",
                title: status.title || "",
                adress: status.adress || "",
                price: status.price || "",
                wilaya: status.wilaya || "",
                commune: status.commune || "",
                contacto: status.contacto || "",
                alquilergeneral: status.alquilergeneral || "",
                itemsReservations_Visa: status.itemsReservations_Visa || "",
                Location_Vacances: status.Location_Vacances || "",




                specifications: status.specifications || [],

                numerodeapartamientos: status.numerodeapartamientos || "",

                promoteurimmobilier: status.promoteurimmobilier || false,

                superficie: status.superficie || "",
                etage: status.etage || "",
                piece: status.piece || "",
                nombre: status.nombre || "",

                nombreChambres: status.nombreChambres || "",
                tipodehabitacioness: status.tipodehabitacioness || "",
                estrellas: status.estrellas || "",
                reservationEnLigne: status.reservationEnLigne || "",
                wifi: status.wifi || [],
                language: status.language || [],
                tipodehabutaciones: status.tipodehabutaciones || [],

                nightlyRate: status.nightlyRate || "",
                hotelWebsite: status.hotelWebsite || "",
                checkInTime: status.checkInTime || "",

                horadudepar: status.horadudepar || "",
                datedepar: status.datedepar || "",
                duracionviaje: status.duracionviaje || "",
                estrellas: status.estrellas || "",
                transporte: status.transporte || "",
                destinacionvoyage1: status.destinacionvoyage1 || "",
                destinacionvoyage2: status.destinacionvoyage2 || "",
                voyage1hotel1: status.voyage1hotel1 || "",
                voyage1hotel2: status.voyage1hotel2 || "",
                voyage1nombrehotel1: status.voyage1nombrehotel1 || "",
                voyage1nombrehotel2: status.voyage1nombrehotel2 || "",
                fecharegreso: status.fecharegreso || "",
                serviciosdelhotel: status.serviciosdelhotel || "",
                cancelarreserva: status.cancelarreserva || "",
                destinacionhadj: status.destinacionhadj || "",



            });
            setImages(status.images || []);
            setSelectedWilaya(status.wilaya || "");
        }
    }, [status]);


    const subcategoryy = () => (
        <div className="form-group">
            <select name="subCategory" value={postData.subCategory} onChange={handleChangeInput} className="form-control"  >
                <option value="">Catégorie...</option>
                <option value="Voyage_Organise">Voyage Organisé</option>
                <option value="Location_Vacances">Location Vacances</option>
                <option value="hadj_Omra">Hadj & Omra</option>
                <option value="Reservations_Visa">Réservations & Visa</option>
                <option value="Sejour">Séjour</option>
                <option value="Croisiere">Croisière</option>
                <option value="Autre">Autre</option>
            </select>
            <small className='text-danger'>Ce champ est requis</small>
        </div>
    )

    const typosdealojamiento = () => (
        <div className="form-group">
            <label>Type d’hébergement</label>
            <select name="alquilergeneral" value={postData.alquilergeneral} onChange={handleChangeInput} className="form-control"  >
                <option value="">Catégorie...</option>
                <option value="Hotel">Hôtel</option>
                <option value="Auberge">Auberge</option>
                <option value="Maison_hotes">Maison d'hôtes</option>
                <option value="Appartement">Appartement</option>
                <option value="Chalet">Chalet</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Camping">Camping</option>
                <option value="Resort">Resort</option>
                <option value="Riad">Riad</option>
                <option value="Gite">Gîte</option>
                <option value="Village_Vacances">Village Vacances</option>
                <option value="Airbnb">Airbnb</option>
            </select>
            <small className='text-danger'>Ce champ est requis</small>
        </div>
    );

    const itemsReservations_Visa = () => (
        <div>
            <select style={{ display: "flex", alignItems: "flex-end" }}
                onChange={handleChangeInput}
                value={postData.Reservations_Visa} name="Reservations_Visa" className="form-control"  >  <option value="">Sélectionner une sub catégorie</option>
                <option value="billet">Billet d'avion</option>
                <option value="hotel">Réservation d'hôtel</option>
                <option value="visa">Assistance Visa</option>
                <option value="traitement_documents">Traitement des documents pour visas</option>
                <option value="cita_visa">Obtention de rendez-vous pour visa</option>
                <option value="paquet_touristique">Réservations de packages touristiques</option>
                <option value="traduction_legalisation">Traduction et légalisation de documents</option>
                <option value="assurance_voyage">Assurance de voyage</option>
                <option value="location_voiture">Location de véhicules</option>
            </select>
            <small className='text-danger'>Ce champ est requis</small>
        </div>
    )


    //RESERVACION HOTELLLLLLLL 
    const title = () => (
        <div className="form-group">

            <input type="text" name="title" value={postData.title} onChange={handleChangeInput} placeholder="Titre" className="form-control" />
        </div>
    );
    const nombre = () => (
        <div className="form-group">

            <input type="text" name="nombredelhotel" value={postData.nombredelhotel} onChange={handleChangeInput} placeholder="Nom" className="form-control" />
        </div>
    );
    const adress = () => (
        <div className="form-group">

            <input type="text" name="adress" value={postData.adress} onChange={handleChangeInput} placeholder="Adresse" className="form-control" />
        </div>
    );
    const adresshotel = () => (
        <div className="form-group">

            <input type="text" name="adresshotel" value={postData.adresshotel} onChange={handleChangeInput} placeholder="Adresse" className="form-control" />
        </div>
    );
    const nombreChambres = () => (
        <div className="form-group">

            <input type="number" name="totalhabitaciones" value={postData.totalhabitaciones} onChange={handleChangeInput} placeholder="Nombre total de chambres" className="form-control" />
        </div>
    )
    const tipodehabitacioness = () => (
        <Select
            placeholder="Types de chambres"
            value={tipodehabutaciones.filter(obj => postData.tipodehabutaciones && postData.tipodehabutaciones.includes(obj.value))}
            options={tipodehabutaciones}
            onChange={handleChangetipodehabutaciones}
            isMulti={true}
            closeMenuOnSelect={false}
        />
    )

    const etoilesHotel = () => (
        <div className="form-group">

            <select name="estrellas" value={postData.estrellas} onChange={handleChangeInput} placeholder="Classement par étoiles" className="form-control"  >
                <option value="">Sélectionner...</option>
                <option value="1">★</option>
                <option value="2">★★</option>
                <option value="3">★★★</option>
                <option value="4">★★★★</option>
                <option value="5">★★★★★</option>
            </select>
        </div>
    );

    const reservationEnLigne = () => (
        <div className="form-group">

            <select name="reservacionenlinea" value={postData.reservacionenlinea} onChange={handleChangeInput} className="form-control">
                <option value="">Réservation en ligne disponible ?</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
            </select>
        </div>
    );




    const languagehotel = () => (
        <Select
            placeholder="Langue du personnel"
            value={language.filter(obj => postData.language && postData.language.includes(obj.value))}
            options={language}
            onChange={handleChangelaguage}
            isMulti={true}
            closeMenuOnSelect={false}
        />
    )


    const servicehotel = () => (
        <Select
            placeholder="Services inclus"
            value={wifi.filter(obj => postData.wifi && postData.wifi.includes(obj.value))}
            options={wifi}
            onChange={handlechangewifi}
            isMulti={true}
            closeMenuOnSelect={false}
        />
    )

    const tarifParNuit = () => (
        <div className="form-group">

            <input type="number" name="tarifnuit" value={postData.tarifnuit} onChange={handleChangeInput} placeholder='Tarif par nuit (en DA)' className="form-control" />
        </div>
    );

    const politiqueAnnulation = () => (
        <div className="form-group">

            <select name="cancelarreserva" value={postData.cancelarreserva} onChange={handleChangeInput} className="form-control"  >
                <option value="">Politique d’annulation</option>
                <option value="Flexible">Flexible (annulation gratuite jusqu’à 24h avant)</option>
                <option value="Moderee">Modérée (50% de remboursement jusqu’à 7 jours avant)</option>
                <option value="Strict">Stricte (non remboursable)</option>
            </select>
        </div>

    );

    const sitewebhotel = () => (
        <div className="form-group">

            <input type="url" name="hotelWebsite" value={postData.hotelWebsite} onChange={handleChangeInput} placeholder="Site web de l’hôtel" className="form-control" />
        </div>
    );

    const horariodellegada = () => (
        <div className="form-group">

            <input type="time" name="horariollegada" value={postData.horariollegada} onChange={handleChangeInput} className="form-control" placeholder='Heure d’arrivée' />
        </div>
    );
















    //ALQUILER OTROS BIENES
    const superficie = () => (
        <div>
            <input
                type="number"
                name="superficie"
                value={postData.superficie}
                onChange={handleChangeInput}
                className="form-control"
                placeholder="Superficie en M²"
            />
        </div>
    )
    const etage = () => (
        <div>
            <input
                type="number"
                name="etage"
                value={postData.etage}
                onChange={handleChangeInput}
                className="form-control"
                placeholder="Etage(s)"
            />
        </div>
    )
    const piece = () => (
        <div>
            <input
                type="number"
                name="piece"
                value={postData.piece}
                onChange={handleChangeInput}
                className="form-control"
                placeholder="Pièces"
            />
        </div>
    )




    //VOYAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

    /* const title = () => (
        <div className="form-group">
            <small className="text-primary">Titre du voyage </small>
            <input type="text" name="title" value={postData.title} onChange={handleChangeInput} className="form-control" placeholder='Exemple: Voyage culturel à Istanbul et Dubaï' />
        </div>

    )*/

    const description = () => (
        <div className="form-group">
            <small className="text-primary">Description Programme  </small>
            <textarea name="description" value={postData.description}
                onChange={handleChangeInput}
                placeholder='Description...'
            />
        </div>
    )


    const wilayacommune = () => (
        <div className="form-group">
            <small className="text-primary">Ville de départ</small>
            <div className="form-group">

                <select
                    multiple={false}
                    className="form-control"
                    name="wilaya"
                    value={postData.wilaya} // Usar postData.wilaya
                    onChange={handleWilayaChange}
                >
                    <option value="">Sélectionnez une wilaya</option>
                    {wilayasOptions} {/* Opciones de wilayas */}
                </select>

            </div>

            {/* Campo Commune */}
            <div className="form-group">
                <select
                    multiple={false}
                    className="form-control"
                    name="commune"
                    value={postData.commune} // Usar postData.commune
                    onChange={handleCommuneChange}
                >
                    <option value="">Sélectionnez la commune</option>
                    {communesOptions} {/* Opciones de communes */}
                </select>

            </div>

        </div>

    )


    const adressdudepar = () => (
        <div className="form-group">
            <small className="text-primary">Adress de départ</small>
            <input type="text" name="adressdudepar" value={postData.adressdudepar} onChange={handleChangeInput} className="form-control" />
        </div>

    )

    const heuredudepar = () => (
        <div className="form-group">
            <small className="text-primary">Heure de départ</small>
            <input type="text" name="horadudepar" value={postData.horadudepar} onChange={handleChangeInput} className="form-control" />
        </div>

    )
    const datedepart = () => (
        <div className="form-group">
            <small className="text-primary">Date de départ </small>
            <input type="date" name="datedepar" value={postData.datedepar} onChange={handleChangeInput} className="form-control" />
        </div>

    )

    const duraciondelviaje = () => (
        <div className="form-group">
            <small className="text-primary">Durée du séjour </small>
            <input type="text" name="duracionviaje" value={postData.duracionviaje} onChange={handleChangeInput} className="form-control" placeholder="Exemple: 4 jours / 3 nuitées" />
        </div>
    )
    const transporteutilizado = () => (
        <div className="form-group">
            <small className="text-primary">Moyen de transport </small>
            <select name="transporte" value={postData.transporte} onChange={handleChangeInput} className="form-control"  >
                <option value="">Sélectionner...</option>
                <option value="Avion">Avion</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Voiture">Voiture</option>
            </select>
        </div>
    )


    const destinacionvoyage1 = () => (
        <div>
            <small className="text-primary">Destination 1 </small>
            <select name="destinacionvoyage1" value={postData.destinacionvoyage1} onChange={handleChangeInput} className="form-control"  >

                <option value="">Choisir une destination...</option>
                <optgroup label="Destinations Nationales">
                    <option value="Alger">Alger</option>
                    <option value="Oran">Oran</option>
                    <option value="Constantine">Constantine</option>
                    <option value="Tlemcen">Tlemcen</option>
                    <option value="Béjaïa">Béjaïa</option>
                    <option value="Timimoun">Timimoun</option>
                    <option value="Djanet">Djanet</option>
                    <option value="Taghit">Taghit</option>
                    <option value="Boussaâda">Boussaâda</option>
                    <option value="Oued Souf">Oued Souf</option>
                </optgroup>
                <optgroup label="Destinations Internationales">
                    <option value="Istanbul">Istanbul</option>
                    <option value="Dubaï">Dubaï</option>
                    <option value="Le Caire">Le Caire</option>
                    <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Djerba">Djerba</option>
                    <option value="Moscou">Moscou</option>
                    <option value="Saint Petersburg">Saint Petersburg</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Langkawi">Langkawi</option>
                    <option value="Bakou">Bakou</option>
                    <option value="Téhéran">Téhéran</option>
                    <option value="Kashan">Kashan</option>
                    <option value="Ispahan">Ispahan</option>
                    <option value="Shiraz">Shiraz</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Las Vegas">Las Vegas</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Andalousie">Andalousie</option>
                    <option value="Rome">Rome</option>
                    <option value="Paris">Paris</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Zanzibar">Zanzibar</option>
                    <option value="Jordanie">Jordanie</option>
                    <option value="Ouzbékistan">Ouzbékistan</option>
                    <option value="Thaïlande">Thaïlande</option>
                </optgroup>
            </select>


        </div>
    )
    const hibergementdestinacionvoyage1 = () => (
        <div className="form-group">
            <small className="text-primary">Hébergement - Destination 1 </small>
            <input type="text" name="voyage1hotel1" value={postData.voyage1hotel1} onChange={handleChangeInput} className="form-control" placeholder="Hébergement Hotel, Appartement..." />
        </div>
    )
    const nombrehotelvoyage1 = () => (
        <div className="form-group">

            <input type="text" name="voyage1nombrehotel1" value={postData.voyage1nombrehotel1} onChange={handleChangeInput} className="form-control" placeholder="Nom de l'établissement" />
        </div>
    )
    const destinacionvoyage2 = () => (
        <div>
            <small className="text-primary">Destination 2 </small>
            <select name="destinacionvoyage2" value={postData.destinacionvoyage2} onChange={handleChangeInput} className="form-control"  >

                <option value="">Choisir une destination...</option>
                <optgroup label="Destinations Nationales">
                    <option value="Alger">Alger</option>
                    <option value="Oran">Oran</option>
                    <option value="Constantine">Constantine</option>
                    <option value="Tlemcen">Tlemcen</option>
                    <option value="Béjaïa">Béjaïa</option>
                    <option value="Timimoun">Timimoun</option>
                    <option value="Djanet">Djanet</option>
                    <option value="Taghit">Taghit</option>
                    <option value="Boussaâda">Boussaâda</option>
                    <option value="Oued Souf">Oued Souf</option>
                </optgroup>
                <optgroup label="Destinations Internationales">
                    <option value="Istanbul">Istanbul</option>
                    <option value="Dubaï">Dubaï</option>
                    <option value="Le Caire">Le Caire</option>
                    <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Djerba">Djerba</option>
                    <option value="Moscou">Moscou</option>
                    <option value="Saint Petersburg">Saint Petersburg</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Langkawi">Langkawi</option>
                    <option value="Bakou">Bakou</option>
                    <option value="Téhéran">Téhéran</option>
                    <option value="Kashan">Kashan</option>
                    <option value="Ispahan">Ispahan</option>
                    <option value="Shiraz">Shiraz</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Las Vegas">Las Vegas</option>
                    <option value="San Francisco">San Francisco</option>
                    <option value="Andalousie">Andalousie</option>
                    <option value="Rome">Rome</option>
                    <option value="Paris">Paris</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Zanzibar">Zanzibar</option>
                    <option value="Jordanie">Jordanie</option>
                    <option value="Ouzbékistan">Ouzbékistan</option>
                    <option value="Thaïlande">Thaïlande</option>
                </optgroup>
            </select>


        </div>
    )


    const hibergementdestinacionvoyage2 = () => (
        <div className="form-group">
            <small className="text-primary">Hébergement - Destination 2 </small>
            <input type="text" name="voyage2hotel2" value={postData.voyage2hotel2} onChange={handleChangeInput} className="form-control" placeholder="Hébergement Hotel, Appartement..." />
        </div>
    )
    const nombrehotelvoyage2 = () => (
        <div className="form-group">

            <input type="text" name="voyage1nombrehotel2" value={postData.voyage1nombrehotel2} onChange={handleChangeInput} className="form-control" placeholder="Nom de l'établissement" />
        </div>
    )
    const datederoutour = () => (
        <div className="form-group">
            <small className="text-primary">Date de retour </small>
            <input type="date" name="fecharegreso" value={postData.fecharegreso} onChange={handleChangeInput} className="form-control" />
        </div>

    )


    const pensionofrecida = () => (
        <div className="form-group">
            <small className="text-primary"> Pension</small>
            <select name="serviciosdelhotel" value={postData.serviciosdelhotel} onChange={handleChangeInput} className="form-control"  >
                <option value="">Sélectionner...</option>
                <option value="Complète">Complète</option>
                <option value="Demi-pension">Demi-pension</option>
                <option value="Petit déjeuner">Petit déjeuner</option>
                <option value="Sans repas">Sans repas</option>
            </select>
        </div>



    )

    const precioporpersona = () => (
        <div className="form-group">
            <small className="text-primary">Prix par personne (DA) </small>
            <div className="card-body form-group">

                <div style={{ padding: '0 20px' }}>
                    <Slider
                        min={500}
                        max={2000000}
                        step={500}
                        value={postData.price || 0} // Si no hay precio, el slider empieza en 0
                        onChange={(value) => {
                            setPostData(prevState => ({
                                ...prevState,
                                price: value // Solo actualizamos el valor de 'price'
                            }));
                        }}
                        trackStyle={{ backgroundColor: '#44EB00', height: 10 }}
                        handleStyle={{
                            borderColor: '#00AF72',
                            height: 20,
                            width: 20,
                            marginLeft: -10,
                            marginTop: -5,
                            backgroundColor: '#007bff',
                        }}
                        railStyle={{ backgroundColor: '#ccc', height: 10 }}
                    />
                </div>

                <div style={{ marginTop: 10 }}>
                    {postData.price} DA
                </div>
            </div>  </div>

    )
    const incluidosenelprecio = () => (
        <div className="form-group">
            <small className="text-primary">Inclus dans le prix </small>
            <textarea name="incluidoenelprecio" value={postData.incluidoenelprecio} onChange={handleChangeInput} className="form-control" rows="3" placeholder="Exemple: Billet d'avion, hébergement, repas, visites guidées" />
        </div>
    )
    const condicionesdeanulacion = () => (
        <div className="form-group">
            <small className="text-primary">Conditions d'annulation la réservation</small>
            <textarea name="cancelarreserva" value={postData.cancelarreserva} onChange={handleChangeInput} className="form-control" rows="3" />
        </div>
    )

    const contactodereservacion = () => (
        <div className="form-group">
            <small className="text-primary">Contact pour la réservation </small>
            <textarea type="text" name="contacto" value={postData.contacto} onChange={handleChangeInput} className="form-control" placeholder="Votre contact: téléphone, email, site web, réseaux sociaux etc..." />
        </div>

    )


    const destinacionhadjomra = () => (
        <div>
            <small className="text-primary">Destination  </small>
            <select name="destinacionhadj" value={postData.destinacionhadj} onChange={handleChangeInput} className="form-control" >

                <optgroup label="Ciudades Sagradas">
                    <option value="Meca">Meca (Al-Masjid al-Haram)</option>
                    <option value="Medina">Medina (Al-Masjid an-Nabawi)</option>
                </optgroup>
                <optgroup label="Ciudades de Entrada / Aeropuertos">
                    <option value="Yeda">Yeda (Aeropuerto Internacional Rey Abdulaziz)</option>
                    <option value="Taif">Taif</option>
                    <option value="Dammam">Dammam</option>
                    <option value="Riad">Riad</option>
                </optgroup>
                <optgroup label="Sitios de Ziyara Populares">
                    <option value="Mina">Mina</option>
                    <option value="Arafat">Arafat</option>
                    <option value="Muzdalifah">Muzdalifah</option>
                    <option value="Jabal al-Nour">Jabal al-Nour</option>
                    <option value="Jabal Thawr">Jabal Thawr</option>
                    <option value="Cueva de Hira">Cueva de Hira</option>
                    <option value="Cementerio de Al-Baqi">Cementerio de Al-Baqi</option>
                    <option value="Quba">Mezquita de Quba</option>
                    <option value="Qiblatain">Mezquita de Qiblatain</option>
                </optgroup>
            </select>
        </div>
    )


    return (
        <div className='status_modal'  >
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Annonces Reservation</h5>
                    <span onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        &times;
                    </span>
                </div>
                <div className="status_body">

                    <div className="form-group">
                        {subcategoryy()}
                    </div>
                    {postData.subCategory === "Reservations_Visa" && (
                        <div>
                            <div className="form-group">
                                {itemsReservations_Visa()}
                            </div>

                            <div className="form-group">
                                {description()}
                            </div>
                        </div>
                    )}


                    {postData.subCategory === "hadj_Omra" && (
                        <div>
                            <div className='form-group'>

                                <div className="form-group">
                                    {title()}
                                </div>

                                <div className="form-group">
                                    {description()}
                                </div>
                                <div className="form-group">
                                    {adress()}
                                </div>
                                <div className="form-group">
                                    {wilayacommune()}
                                </div> <div className="form-group">
                                    {heuredudepar()}
                                </div>

                                <div className="form-group">
                                    {datedepart()}
                                </div>
                                <div className="form-group">
                                    {duraciondelviaje()}
                                </div>
                                <div className="form-group">
                                    {transporteutilizado()}
                                </div>
                                <div className="form-group">
                                    {destinacionhadjomra()}
                                </div>


                                <div className="form-group"  >
                                    {datederoutour()}
                                </div>
                                <div className="form-group"  >
                                    {pensionofrecida()}
                                </div>

                                <div className="form-group"  >
                                    {precioporpersona()}
                                </div>

                                <div className="form-group"  >
                                    {incluidosenelprecio()}
                                </div>
                                <div className="form-group"  >
                                    {contactodereservacion()}
                                </div>


                                <div className="form-group"  >
                                    {condicionesdeanulacion()}
                                </div>



                            </div>
                        </div>

                    )}



                    {postData.subCategory === "Voyage_Organise" && (
                        <div>
                            <div className='form-group'>

                                <div className="form-group">
                                    {title()}
                                </div>
                              
                                <div className="form-group">
                                    {description()}
                                </div>
                                <div className="form-group">
                                    {adress()}
                                </div>
                                <div className="form-group">
                                    {wilayacommune()}
                                </div> <div className="form-group">
                                    {heuredudepar()}
                                </div>

                                <div className="form-group">
                                    {datedepart()}
                                </div>
                                <div className="form-group">
                                    {duraciondelviaje()}
                                </div>
                                <div className="form-group">
                                    {transporteutilizado()}
                                </div>

                                <div className="form-group">
                                    {destinacionvoyage1()}
                                </div>

                                <div className="form-group">
                                    {hibergementdestinacionvoyage1()}
                                </div>
                                <div className="form-group">
                                    {nombrehotelvoyage1()}
                                </div>


                                <div className="form-group">
                                    {destinacionvoyage2()}
                                </div>
                                <div className="form-group">
                                    {hibergementdestinacionvoyage2()}
                                </div>
                                <div className="form-group">
                                    {nombrehotelvoyage2()}
                                </div>
                                <div className="form-group">
                                    {pensionofrecida()}
                                </div>

                                <div className="form-group"  >
                                    {datederoutour()}
                                </div>


                                <div className="form-group"  >
                                    {precioporpersona()}
                                </div>

                                <div className="form-group"  >
                                    {incluidosenelprecio()}
                                </div>

                                <div className="form-group"  >
                                    {politiqueAnnulation()}
                                </div>
                                <div className="form-group"  >
                                    {contactodereservacion()}
                                </div>
                            </div>
                        </div>



                    )}







                    {postData.subCategory === "Location_Vacances" && (
                        <div>
                            <div className="form-group">
                                {typosdealojamiento()}
                            </div>
                            {postData.alquilergeneral === "Hotel" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {title()}
                                    </div>

                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adresshotel()}
                                    </div>

                                    <div className="form-group">
                                        <small className="text-primary">Wilaya commune</small>
                                        <div className="form-group">

                                            <select
                                                multiple={false}
                                                className="form-control"
                                                name="wilaya"
                                                value={postData.wilaya} // Usar postData.wilaya
                                                onChange={handleWilayaChange}
                                            >
                                                <option value="">Sélectionnez une wilaya</option>
                                                {wilayasOptions} {/* Opciones de wilayas */}
                                            </select>

                                        </div>

                                        {/* Campo Commune */}
                                        <div className="form-group">
                                            <select
                                                multiple={false}
                                                className="form-control"
                                                name="commune"
                                                value={postData.commune} // Usar postData.commune
                                                onChange={handleCommuneChange}
                                            >
                                                <option value="">Sélectionnez la commune</option>
                                                {communesOptions} {/* Opciones de communes */}
                                            </select>

                                        </div>

                                    </div>
                                    <div className="form-group">
                                        {etoilesHotel()}
                                    </div>
                                    <div className="form-group">
                                        {nombreChambres()}

                                    </div>


                                    <div className="form-group">
                                        {tipodehabitacioness()}

                                    </div>
                                    <div className="form-group" >

                                        <div className="form-group"  >
                                            {servicehotel()}
                                        </div>
                                        <div className="form-group"  >
                                            {tarifParNuit()}
                                        </div>
                                        <div className="form-group"  >
                                            {reservationEnLigne()}
                                        </div>

                                        <div className="form-group"  >
                                            {politiqueAnnulation()}
                                        </div>
                                        <div className="form-group"  >
                                            {languagehotel()}
                                        </div>


                                        <div className="form-group"  >
                                            {sitewebhotel()}
                                        </div>

                                        <div className="form-group"  >
                                            {horariodellegada()}
                                        </div>
                                        <div className="form-group">
                                            {description()}
                                        </div>
                                    </div>
                                </div>
                            )}


                            {postData.alquilergeneral === "Appartement" && (
                                <div className='form-group'>

                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>
                                    <div className="form-group"  >
                                        {etage()}
                                    </div>
                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            isMulti
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>

                                </div>
                            )}



                            {postData.alquilergeneral === "Auberge" && (
                                <div className='form-group'>

                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>
                                    <div className="form-group"  >
                                        {etage()}
                                    </div>
                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>

                            )}

                            {postData.alquilergeneral === "Maison_hotes" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>
                                    <div className="form-group">
                                        {superficie()}
                                    </div>
                                    <div className="form-group"  >
                                        {etage()}
                                    </div>
                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            isMulti
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>

                                </div>
                            )}

                            {postData.alquilergeneral === "Chalet" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>
                                    <div className="form-group">
                                        {superficie()}
                                    </div>
                                    <div className="form-group"  >
                                        {etage()}
                                    </div>
                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>

                            )}



                            {postData.alquilergeneral === "Camping" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>
                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>
                            )}


                            {postData.alquilergeneral === "Riad" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>
                            )}

                            {postData.alquilergeneral === "Gite" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>
                            )}


                            {postData.alquilergeneral === "Village_Vacances" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>

                                    <div className="form-group">
                                        <label className="text-primary">Spécifications</label>

                                        <Select
                                            options={specifications}
                                            selectedValues={postData.specifications}
                                            onSelect={handleSelect}
                                            onRemove={handleRemove}
                                            displayValue="label"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>
                                </div>
                            )}

                            {postData.alquilergeneral === "Resort" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>
                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>

                                </div>

                            )}

                            {postData.alquilergeneral === "Airbnb" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>

                                    <div className="form-group">
                                        {piece()}
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>

                                </div>

                            )}
                            {postData.alquilergeneral === "Bungalow" && (
                                <div className='form-group'>
                                    <div className="form-group">
                                        {nombre()}
                                    </div>
                                    <div className="form-group"  >
                                        {adress()}
                                    </div>

                                    <div className="form-group">
                                        {superficie()}
                                    </div>
                                    <div className="form-group">
                                        {piece()}
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label className="text-primary">Spécifications</label>

                                            <Select
                                                options={specifications}
                                                selectedValues={postData.specifications}
                                                onSelect={handleSelect}
                                                onRemove={handleRemove}
                                                displayValue="label"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        {description()}
                                    </div>


                                </div>
                            )}
                        </div>

                    )}

                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key={index} id="file_img">
                                    {
                                        img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ? <>
                                                    {
                                                        img.url.match(/video/i)
                                                            ? videoShow(img.url, theme)
                                                            : imageShow(img.url, theme)
                                                    }
                                                </>
                                                : <>
                                                    {
                                                        img.type.match(/video/i)
                                                            ? videoShow(URL.createObjectURL(img), theme)
                                                            : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                    }
                                    <span onClick={() => deleteImages(index)}>&times;</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }

                    <div className="input_images">
                        {
                            stream
                                ? <i className="fas fa-camera" onClick={handleCapture} />
                                : <>
                                    <i className="fas fa-camera" onClick={handleStream} />

                                    <div className="file_upload">
                                        <i className="fas fa-image" />
                                        <input type="file" name="file" id="file"
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    </div>
                                </>
                        }

                    </div>


                    <div className="status_footer">
                        <button className="btn btn-secondary w-100" type="submit">
                            Publie
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default StatusModal
