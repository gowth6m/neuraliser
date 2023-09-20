import { useViewStateContext } from "@/contexts/viewContext";
import { Layout } from "@/components/layout/Layout";
import { useFilesContext } from "@/contexts/filesContext";
import GraphView from "@/components/home/GraphView";
import DashboardView from "@/components/home/DashboardView";
import HomeAppbar from "@/components/home/HomeAppbar";

const Home = () => {
    const { graphName } = useViewStateContext();
    const { downloadJsonFile } = useFilesContext();

    return (
        <main>
            <Layout
                appBarChild={
                    <HomeAppbar
                        graphName={graphName}
                        downloadJsonFile={downloadJsonFile}
                    />
                }
            >
                {graphName ? <GraphView /> : <DashboardView />}
            </Layout>
        </main>
    );
};

export default Home;
