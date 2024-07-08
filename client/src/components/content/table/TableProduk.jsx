import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProdukAdmin = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        Nama: "",
        Merek: "",
        BeratBersih: "",
        Harga: "",
        gambar: ""
    });
    const [isAdding, setIsAdding] = useState(false);

    const handleAddRow = () => {
        setNewItem({
            Nama: "",
            Merek: "",
            BeratBersih: "",
            Harga: "",
            gambar: ""
        });
        setIsAdding(true);
    };

    useEffect(() => {
        fetch('http://localhost:3080/api/v2/data-barang')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSave = async () => {
        console.log("Saving item:", newItem);
        try {
            const newProduct = {
                nama: newItem.Nama,
                merek: newItem.Merek,
                beratBersih: newItem.BeratBersih,
                harga: parseInt(newItem.Harga),
                gambar: newItem.gambar
            };

            const response = await axios.post("http://localhost:3080/api/v2/data-barang", newProduct);
            const data = response.data;
            console.log("Data barang dikirim:", data);
            setItems([...items, data]);
            setNewItem({
                Nama: "",
                Merek: "",
                BeratBersih: "",
                Harga: "",
                gambar: ""
            });
            setIsAdding(false);
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err.message);
        }
    };

    const handleChange = (value, field) => {
        setNewItem({
            ...newItem,
            [field]: value,
        });
    };

    const handleDelete = async (idBarang) => {
        try {
            const response = await axios.delete(`http://localhost:3080/api/v2/data-barang/${idBarang}`);
            console.log("Data barang dihapus:", response.data);
            setItems(items.filter((barang) => barang.idBarang !== idBarang));
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="bg-white relative overflow-x-auto shadow-sm sm:rounded-lg mt-12 me-12 p-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Data Barang</h2>
            <button
                onClick={handleAddRow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mb-4 mt-4 text-xs"
            >
                TAMBAH
            </button>
            <div className="flex justify-between items-center mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Id</th>
                            <th scope="col" className="px-6 py-3">Nama</th>
                            <th scope="col" className="px-6 py-3">Merek</th>
                            <th scope="col" className="px-6 py-3">Berat Bersih</th>
                            <th scope="col" className="px-6 py-3">Harga</th>
                            <th scope="col" className="px-6 py-3">Gambar</th>
                            <th scope="col" className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(items) && items.map((barang) => (
                            <tr key={barang.idBarang} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap">{barang.idBarang}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{barang.Nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{barang.Merek}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{barang.BeratBersih}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{barang.Harga}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={barang.gambar} alt={barang.Nama} className="h-10 w-10 object-cover" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDelete(barang.idBarang)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-xs"
                                    >
                                        HAPUS
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {isAdding && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e.target.value, "Nama")}
                                        value={newItem.Nama}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e.target.value, "Merek")}
                                        value={newItem.Merek}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e.target.value, "BeratBersih")}
                                        value={newItem.BeratBersih}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="number"
                                        onChange={(e) => handleChange(e.target.value, "Harga")}
                                        value={newItem.Harga}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e.target.value, "gambar")}
                                        value={newItem.gambar}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-xs"
                                    >
                                        SIMPAN
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProdukAdmin;
