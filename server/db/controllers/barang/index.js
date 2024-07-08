const barangModel = require("../../models/barang");

async function getDataBarang(req, res) {
  try {
    const dataBarang = await barangModel.getDataBarang();
    res.json(dataBarang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createBarang(req, res) {
  try {
    const barang = req.body;
    const newBarang = await barangModel.createBarang(barang);
    res.json(newBarang[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteBarang(req, res) {
  try {
    const { idBarang } = req.params;
    const deletedBarang = await barangModel.deleteBarang(idBarang);
    res.json(deletedBarang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBrandDistribution(req, res) {
  try {
    const brandDistribution = await barangModel.getBrandDistribution();
    const priceDistribution = {
      "Under 50k": 0,
      "50k-100k": 0,
      "100k-200k": 0,
      "200k-500k": 0,
      "Above 500k": 0,
    };

    brandDistribution.forEach((item) => {
      if (item.price < 50000) priceDistribution["Under 50k"]++;
      else if (item.price >= 50000 && item.price < 100000)
        priceDistribution["50k-100k"]++;
      else if (item.price >= 100000 && item.price < 200000)
        priceDistribution["100k-200k"]++;
      else if (item.price >= 200000 && item.price < 500000)
        priceDistribution["200k-500k"]++;
      else if (item.price >= 500000) priceDistribution["Above 500k"]++;
    });

    res.json(priceDistribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getDataBarang,
  createBarang,
  deleteBarang,
  getBrandDistribution,
};
