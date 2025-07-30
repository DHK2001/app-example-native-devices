import { Place } from "@/models/Place";
import * as SQLite from "expo-sqlite";

let db;

export async function init() {
  try {
    db = await SQLite.openDatabaseAsync("places.db");

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      );
    `);
    console.log("Initialize complete");
  } catch (error) {
    console.error("initialize error", error);
    throw error;
  }
}

export async function insertPlace(place) {
  try {
    const result = await db.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error inserting place:", error);
    throw error;
  }
}

export async function getPlaces() {
  try {
    const result = await db.getAllAsync(`SELECT * FROM places`);
    const places = [];

    for (const row of result) {
      places.push(
        new Place(
          row.title,
          row.imageUri,
          { address: row.address, lat: row.lat, lng: row.lng },
          row.id
        )
      );
    }
    return places;
  } catch (error) {
    console.error("Error retrieving places:", error);
    throw error;
  }
}

export async function getPlaceById(id) {
  try {
    const row = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [
      id,
    ]);

    if (!row) {
      return null;
    }

    return new Place(
      row.title,
      row.imageUri,
      { address: row.address, lat: row.lat, lng: row.lng },
      row.id
    );
  } catch (error) {
    console.error("Error retrieving place by ID:", error);
    throw error;
  }
}

export async function deletePlaceById(id) {
  try {
    const result = await db.runAsync(`DELETE FROM places WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return "No matching record to delete.";
    }

    return "Success. Deleted.";
  } catch (error) {
    console.error("Error deleting place by ID:", error);
    throw error;
  }
}
