"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePhotos } from "@/lib/hooks/usePhotos";
import { Photo } from "@tdorsey/models";
import { LinksSvg } from "@tdorsey/shared";
import styles from "./page.module.css";

export default function PhotosPage() {
  const { data: session } = useSession();
  const { photos, isLoading, error } = usePhotos();
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>Error: {error instanceof Error ? error.message : String(error)}</div>
    );

  const toggleLike = (photoId: number) => {
    setLikedPhotos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(photoId)) {
        newSet.delete(photoId);
      } else {
        newSet.add(photoId);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>CI</div>
        <div className={styles.headerUser}>
          <span className={styles.headerEmail}>{session?.user?.email}</span>
          <button
            className={styles.signOutButton}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>All photos</h1>

        <ul className={styles.photoList}>
          {(photos ?? []).map((photo: Photo) => (
            <li key={photo.id} className={styles.photoRow}>
              <button
                onClick={() => toggleLike(photo.id)}
                className={styles.likeButton}
                aria-label={
                  likedPhotos.has(photo.id) ? "Unlike photo" : "Like photo"
                }
              >
                <span
                  className={
                    likedPhotos.has(photo.id)
                      ? styles.starLiked
                      : styles.starUnliked
                  }
                >
                  {likedPhotos.has(photo.id) ? "★" : "☆"}
                </span>
              </button>

              <img
                src={photo.src.medium}
                alt={photo.alt}
                className={styles.photoThumbnail}
                width={150}
                height={150}
              />

              <div className={styles.photoInfo}>
                <span className={styles.photoPhotographer}>
                  {photo.photographer}
                </span>
                <span className={styles.photoAlt}>{photo.alt}</span>
                <span className={styles.photoColor}>
                  {photo.avgColor}
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: photo.avgColor }}
                  />
                </span>
              </div>

              <a
                href={photo.photographerUrl}
                className={styles.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={LinksSvg.src}
                  alt={photo.photographer}
                  aria-hidden="true"
                />
                Portfolio
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
