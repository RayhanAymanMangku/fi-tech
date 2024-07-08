import React from 'react';
import BarangAddedThisMonthChart from '../../components/chart/BarangChart';
import DashboardTable from '../../components/content/table/UserTable';

const HomeAdmin = () => {
    return (
        <div className="flex w-full bg-[#2c2c2c]">
            <div className="w-full px-14">
                <div className="grid grid-cols-2 gap-4 mt-14">
                    <div className="">
                        <BarangAddedThisMonthChart />
                    </div>
                    <div className="">
                        <DashboardTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
