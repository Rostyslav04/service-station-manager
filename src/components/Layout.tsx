'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from './Search';
import { LogoSvg, DollarSvg, Complete, LoadingSvg, DoubleToolsSvg, MenuSvg, SearchSvg } from '@/assets/svg';
import { useCarsContext } from '@/contexts/CarsContexts';
import ThemeButton from '@/components/ThemeButton';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(false);
    const router = useRouter();

    const [openTab, setOpenTab] = useState('waiting');

    const [openSearch, setOpenSearch] = useState(false);

    const { getCars } = useCarsContext();

    useEffect(() => {
        getCars(openTab);
    }, [openTab]);

    return (
        <>
            <div className="page">
                <div className={navOpen ? 'sidebar active' : 'sidebar'}>
                    <div className="logoBlock">
                        <div className="logo">
                            <LogoSvg className="logo" />
                        </div>
                        <div className="textLogo">
                            Майстерня <div className="textLogo2">рукожопов</div>
                        </div>
                    </div>
                    <div className="sidebarStyle">
                        <div className="buttonBox">
                            <div className="sidebarButton" onClick={() => setOpenTab('waiting')}>
                                <LoadingSvg className="icoButton" />
                                Очікують
                            </div>
                            <div className="sidebarButton" onClick={() => setOpenTab('in work')}>
                                <DoubleToolsSvg className="icoButton" />В роботі
                            </div>
                            <div className="sidebarButton" onClick={() => setOpenTab('done')}>
                                <Complete className="icoButton" />
                                Готові
                            </div>
                            <div className="sidebarButton" onClick={() => setOpenTab('sold')}>
                                <DollarSvg className="icoButton" />
                                Продані
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="header">
                        <div onClick={() => setOpenSearch((prev) => !prev)}>
                            <SearchSvg className="icoHeader" />
                        </div>
                        <div className="icoHeader">
                            <ThemeButton />
                        </div>
                    </div>
                    <div className="content">{children}</div>
                </div>
            </div>

            <Search isActive={openSearch} onClose={() => setOpenSearch((prev) => !prev)} />
        </>
    );
}
