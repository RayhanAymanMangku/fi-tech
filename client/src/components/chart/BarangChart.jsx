import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody, Typography } from "@material-tailwind/react";

function BarChart({ series, categories }) {
    const chartOptions = {
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: categories,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    };

    return <Chart type="bar" series={series} options={chartOptions} />;
}

export function PriceDistributionChart() {
    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchPriceDistribution = async () => {
            try {
                const response = await fetch("http://localhost:3080/api/v2/barang-distribution");
                const data = await response.json();
                console.log("Fetched data:", data);

                const categories = ["Under 50k", "50k-100k", "100k-200k", "200k-500k", "Above 500k"];
                const values = [
                    data["Under 50k"] || 0,
                    data["50k-100k"] || 0,
                    data["100k-200k"] || 0,
                    data["200k-500k"] || 0,
                    data["Above 500k"] || 0
                ];

                setCategories(categories);
                setSeries([{ name: "Jumlah Barang", data: values }]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchPriceDistribution();
    }, []);

    return (
        <section className="w-full">
            <Card>
                <CardBody className="!p-2">
                    <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4">
                        <Typography variant="h3" color="blue-gray">
                            Distribusi Harga Barang
                        </Typography>
                    </div>
                    <BarChart
                        categories={categories}
                        series={series}
                    />
                </CardBody>
            </Card>
        </section>
    );
}

export default PriceDistributionChart;
