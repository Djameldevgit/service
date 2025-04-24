import React from 'react';

const DescriptionPost = ({ post, readMore, setReadMore }) => {
    return (
        <div className="description-container">
            <div className="post-info">

                {/* Encabezado */}
                <div className="info-item">
                    <i className="fas fa-car"></i>
                    <span className="info-label mr-2">{post.subCategory}</span>
                    <span className="info-label mr-2">{post.title}</span>
                </div>

                {/* Fechas */}
                <div className="info-item">
                    <i className="fas fa-calendar-alt"></i>
                    <span className="info-label">Publié le:</span>
                    <span className="info-value">{new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>
                <div className="info-item">
                    <i className="fas fa-sync-alt"></i>
                    <span className="info-label">Actualisé le:</span>
                    <span className="info-value">{new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}</span>
                </div>
                {post.vistas > 0 && (
                    <div className="info-item">
                        <i className="fas fa-eye"></i>
                        <span className="info-label">Vue:</span>
                        <span className="info-value">{post.vistas}</span>
                    </div>
                )}

                {post.description && (
                    <div className="info-item">
                        <i className="fas fa-comments"></i>
                        <span className="info-label mb-2">Description:</span>
                        <span className="info-value">
                            <div className="card_body-content"  >
                                <span>
                                    {
                                        post.description.length < 60
                                            ? post.description
                                            : readMore ? post.description + ' ' : post.description.slice(0, 60) + '.....'
                                    }
                                </span>
                                {
                                    post.description.length > 60 &&
                                    <span className="readMore color-red" onClick={() => setReadMore(!readMore)}>
                                        {readMore ? 'masque lo contenu' : 'Lire plus'}
                                    </span>
                                }
                            </div>
                        </span>
                    </div>
                )}
                {post.price && (
                    <div className="info-item">
                        <i className="fas fa-tag"></i>
                        <span className="info-label">Prix:</span>
                        <span className="info-value">{post.price}</span>
                    </div>
                )}
                {post.wilaya && (
                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="info-label">Wilaya:</span>
                        <span className="info-value">{post.wilaya}</span>
                    </div>
                )}
                {post.commune && (
                    <div className="info-item">
                        <i className="fas fa-map-marker"></i>
                        <span className="info-label">Commune:</span>
                        <span className="info-value">{post.commune}</span>
                    </div>
                )}
                {post.contacto && (
                    <div className="info-item">
                        <i className="fas fa-phone"></i>
                        <span className="info-label">Contact:</span>
                        <span className="info-value">{post.contacto}</span>
                    </div>
                )}

                {/* INFORMACIÓN DE VACACIONES */}
                {post.itemsReservations_Visa && (
                    <div className="info-item">
                        <i className="fas fa-passport"></i>
                        <span className="info-label">Réservations/Visa:</span>
                        <span className="info-value">{post.itemsReservations_Visa}</span>
                    </div>
                )}
                {post.Location_Vacances && (
                    <div className="info-item">
                        <i className="fas fa-umbrella-beach"></i>
                        <span className="info-label">Location Vacances:</span>
                        <span className="info-value">{post.Location_Vacances}</span>
                    </div>
                )}
                {post.alquilergeneral && (
                    <div className="info-item">
                        <i className="fas fa-home"></i>
                        <span className="info-label">À louer:</span>
                        <span className="info-value">{post.alquilergeneral}</span>
                    </div>
                )}
                {post.superficie && (
                    <div className="info-item">
                        <i className="fas fa-ruler-combined"></i>
                        <span className="info-label">Superficie:</span>
                        <span className="info-value">{post.superficie} m²</span>
                    </div>
                )}
                {post.etage && (
                    <div className="info-item">
                        <i className="fas fa-building"></i>
                        <span className="info-label">Étage:</span>
                        <span className="info-value">{post.etage}</span>
                    </div>
                )}
                {post.promoteurimmobilier && (
                    <div className="info-item">
                        <i className="fas fa-user-tie"></i>
                        <span className="info-label">Promoteur Immobilier:</span>
                        <span className="info-value">{post.promoteurimmobilier ? 'Oui' : 'Non'}</span>
                    </div>
                )}
                {post.specifications && post.specifications.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-list"></i>
                        <span className="info-label">Spécifications:</span>
                        <span className="info-value">{post.specifications.join(", ")}</span>
                    </div>
                )}

                {/* INFORMACIÓN DE HOTEL */}
                {post.nombredelhotel && (
                    <div className="info-item">
                        <i className="fas fa-hotel"></i>
                        <span className="info-label">Nom de l'hôtel:</span>
                        <span className="info-value">{post.nombredelhotel}</span>
                    </div>
                )}
                {post.adresshotel && (
                    <div className="info-item">
                        <i className="fas fa-map-pin"></i>
                        <span className="info-label">Adresse:</span>
                        <span className="info-value">{post.adresshotel}</span>
                    </div>
                )}
                {post.totalhabitaciones && (
                    <div className="info-item">
                        <i className="fas fa-bed"></i>
                        <span className="info-label">Total chambres:</span>
                        <span className="info-value">{post.totalhabitaciones}</span>
                    </div>
                )}
                {post.tipodehabutaciones && post.tipodehabutaciones.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-list-ol"></i>
                        <span className="info-label">Types de chambres:</span>
                        <span className="info-value">{post.tipodehabutaciones.join(", ")}</span>
                    </div>
                )}
                {post.estrellas && (
                    <div className="info-item">
                        <i className="fas fa-star"></i>
                        <span className="info-label">Étoiles:</span>
                        <span className="info-value">{post.estrellas} Étoiles </span>
                    </div>
                )}
                {post.wifi && post.wifi.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-wifi"></i>
                        <span className="info-label">WiFi:</span>
                        <span className="info-value">{post.wifi.join(", ")}</span>
                    </div>
                )}
                {post.language && post.language.length > 0 && (
                    <div className="info-item">
                        <i className="fas fa-language"></i>
                        <span className="info-label">Langues:</span>
                        <span className="info-value">{post.language.join(", ")}</span>
                    </div>
                )}
                {post.tarifnuit && (
                    <div className="info-item">
                        <i className="fas fa-money-bill-wave"></i>
                        <span className="info-label">Tarif/nuit:</span>
                        <span className="info-value">{post.tarifnuit}</span>
                    </div>
                )}
                {post.reservacionenlinea && (
                    <div className="info-item">
                        <i className="fas fa-laptop"></i>
                        <span className="info-label">Réservation en ligne:</span>
                        <span className="info-value">{post.reservacionenlinea}</span>
                    </div>
                )}
                {post.politiqueAnnulation && (
                    <div className="info-item">
                        <i className="fas fa-ban"></i>
                        <span className="info-label">Politique d'annulation:</span>
                        <span className="info-value">{post.politiqueAnnulation}</span>
                    </div>
                )}
                {post.hotelWebsite && (
                    <div className="info-item">
                        <i className="fas fa-globe"></i>
                        <span className="info-label">Site web:</span>
                        <span className="info-value">
                            <a href={post.hotelWebsite} target="_blank" rel="noopener noreferrer">
                                {post.hotelWebsite}
                            </a>
                        </span>
                    </div>
                )}
                {post.horariollegada && (
                    <div className="info-item">
                        <i className="fas fa-clock"></i>
                        <span className="info-label">Heure d'arrivée:</span>
                        <span className="info-value">{post.horariollegada}</span>
                    </div>
                )}

                {/* INFORMACIÓN DE VOYAGE */}
                {post.horadudepar && (
                    <div className="info-item">
                        <i className="fas fa-plane-departure"></i>
                        <span className="info-label">Heure de départ:</span>
                        <span className="info-value">{post.horadudepar}</span>
                    </div>
                )}
                {post.datedepar && (
                    <div className="info-item">
                        <i className="fas fa-calendar-day"></i>
                        <span className="info-label">Date de départ:</span>
                        <span className="info-value">{post.datedepar}</span>
                    </div>
                )}
                {post.duracionviaje && (
                    <div className="info-item">
                        <i className="fas fa-hourglass-half"></i>
                        <span className="info-label">Durée du voyage:</span>
                        <span className="info-value">{post.duracionviaje}</span>
                    </div>
                )}
                {post.transporte && (
                    <div className="info-item">
                        <i className="fas fa-bus"></i>
                        <span className="info-label">Transport:</span>
                        <span className="info-value">{post.transporte}</span>
                    </div>
                )}
                {post.destinacionvoyage1 && (
                    <div className="info-item">
                        <i className="fas fa-map-marked-alt"></i>
                        <span className="info-label">Destination 1:</span>
                        <span className="info-value">{post.destinacionvoyage1}</span>
                    </div>
                )}
                {post.voyage1hotel1 && (
                    <div className="info-item">
                        <i className="fas fa-hotel"></i>
                        <span className="info-label">Hôtel 1:</span>
                        <span className="info-value">{post.voyage1hotel1}</span>
                    </div>
                )}
                {post.voyage1nombrehotel1 && (
                    <div className="info-item">
                        <i className="fas fa-signature"></i>
                        <span className="info-label">Nom Hôtel 1:</span>
                        <span className="info-value">{post.voyage1nombrehotel1}</span>
                    </div>
                )}
                {post.destinacionvoyage2 && (
                    <div className="info-item">
                        <i className="fas fa-map-marked-alt"></i>
                        <span className="info-label">Destination 2:</span>
                        <span className="info-value">{post.destinacionvoyage2}</span>
                    </div>
                )}
                {post.voyage2hotel2 && (
                    <div className="info-item">
                        <i className="fas fa-hotel"></i>
                        <span className="info-label">Hôtel 2:</span>
                        <span className="info-value">{post.voyage2hotel2}</span>
                    </div>
                )}
                {post.voyage1nombrehotel2 && (
                    <div className="info-item">
                        <i className="fas fa-signature"></i>
                        <span className="info-label">Nom Hôtel 2:</span>
                        <span className="info-value">{post.voyage1nombrehotel2}</span>
                    </div>
                )}
                {post.fecharegreso && (
                    <div className="info-item">
                        <i className="fas fa-calendar-check"></i>
                        <span className="info-label">Date de retour:</span>
                        <span className="info-value">{post.fecharegreso}</span>
                    </div>
                )}
                {post.serviciosdelhotel && (
                    <div className="info-item">
                        <i className="fas fa-concierge-bell"></i>
                        <span className="info-label">Services hôtel:</span>
                        <span className="info-value">{post.serviciosdelhotel}</span>
                    </div>
                )}
                {post.incluidoenelprecio && (
                    <div className="info-item">
                        <i className="fas fa-check-circle"></i>
                        <span className="info-label">Inclus dans le prix:</span>
                        <span className="info-value">{post.incluidoenelprecio}</span>
                    </div>
                )}
                {post.cancelarreserva && (
                    <div className="info-item">
                        <i className="fas fa-times-circle"></i>
                        <span className="info-label">Annulation:</span>
                        <span className="info-value">{post.cancelarreserva}</span>
                    </div>
                )}
                {post.destinacionhadj && (
                    <div className="info-item">
                        <i className="fas fa-kaaba"></i>
                        <span className="info-label">Destination Hajj:</span>
                        <span className="info-value">{post.destinacionhadj}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DescriptionPost;