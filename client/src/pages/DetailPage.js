import React, {useEffect, useState, useCallback, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'
import { useMessage } from '../hooks/message.hook'

export const DetailPage = () =>{
	const {token} = useContext(AuthContext);
	const {request, error, clearError, loading} = useHttp();
	const [link, setLink] = useState(null);
	const linkId = useParams().id;
	const message = useMessage();

	const getLink = useCallback( async() =>{
		try{
			const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setLink(fetched);
		}
		catch (e){
			message(e.message);
		}
	}, [token, linkId, request, message]);

	useEffect( () => {
		getLink()
	},[getLink])

	useEffect(()=>{
		window.M.updateTextFields();
	},[]);

	useEffect(()=>{
		message(error);
		clearError();
	},[error, message, clearError])


	if (loading){
		return <Loader />
	}

	return(
		<>
			{!loading && link && <LinkCard link={link}/>}
		</>
	)
}
