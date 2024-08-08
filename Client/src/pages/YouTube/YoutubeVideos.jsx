import React, { useEffect, useState } from "react";
import styles from "./Youtube.module.css";
import { Link } from "react-router-dom";

function YoutubeVideos() {
	const [YouTubeVideos, setVideos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_API_KEY;
		const channelId = import.meta.env.VITE_APP_CHANNEL_ID;
		const requestUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=9`;

		fetch(requestUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data.items) {
					setVideos(data.items);
				} else {
					setError("No videos found");
				}
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	return (
		<div className={styles.allVideoWrapper}>
			<div className={styles.container}>
				<div className="row justify-content text-center">
					<div className="col-12">
						<div className={styles.titleWrapper}>Latest Videos</div>
						<br />
					</div>
					{loading && <div>Loading...</div>}
					{error && <div>Error: {error}</div>}
					{YouTubeVideos.length > 0 &&
						YouTubeVideos.map((singleVideo, i) => {
							let vidId = singleVideo.id.videoId;
							let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
							return (
								<div key={i} className="col-sm-12 col-md-6 col-lg-4">
									<div className={styles.singleVideoWrapper}>
										<div className={styles.videoThumbnail}>
											<Link
												to={vidLink}
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													src={singleVideo.snippet.thumbnails.high.url}
													alt={singleVideo.snippet.title}
												/>
											</Link>
										</div>
										<div className={styles.videoInfoWrapper}>
											<div className={styles.videoTitle}>
												<Link
													to={vidLink}
													target="_blank"
													rel="noopener noreferrer"
												>
													{singleVideo.snippet.title}
												</Link>
											</div>
											<div className={styles.videoDesc}>
												{singleVideo.snippet.description}
											</div>
											<div className={styles.videoDesc}>
												{DateFormatter(singleVideo.snippet.publishedAt)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

function DateFormatter(dateTimeString) {
	let date = new Date(dateTimeString);
	let Year = date.getFullYear();
	let Month = date.getMonth() + 1;
	let Day = date.getDate();
	let formattedDate =
		Year +
		"-" +
		Month.toString().padStart(2, "0") +
		"-" +
		Day.toString().padStart(2, "0");
	return formattedDate;
}

export default YoutubeVideos;
