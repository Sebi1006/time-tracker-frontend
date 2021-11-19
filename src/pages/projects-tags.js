import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { projects } from '../__mocks__/projects';
import { tags } from '../__mocks__/tags';
import { ProjectListToolbar } from '../components/project/project-list-toolbar';
import { ProjectCard } from '../components/project/project-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import { TagListToolbar } from '../components/tag/tag-list-toolbar';
import { TagChip } from '../components/tag/tag-chip';

const Projects = () => {
  const MAX_PROJECTS_PER_PAGE = 9;
  const [page, setPage] = useState(1);
  const [project, setProject] = useState(projects);
  const [tag, setTag] = useState(tags);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const addProject = (data) => {
    setProject(project => [...project, data]);
  };

  const addTag = (data) => {
    setTag(tag => [...tag, data]);
  };

  return (
    <>
      <Head>
        <title>
          Projects & Tags | Time Tracker
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <ProjectListToolbar addProject={addProject}/>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {project
                .slice((page - 1) * MAX_PROJECTS_PER_PAGE,
                  (page - 1) * MAX_PROJECTS_PER_PAGE + MAX_PROJECTS_PER_PAGE)
                .map((project) => (
                  <Grid
                    item
                    key={project.id}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <ProjectCard project={project}/>
                  </Grid>
                ))}
            </Grid>
          </Box>
          {
            !(project.length <= MAX_PROJECTS_PER_PAGE) &&
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3
              }}
            >
              <Pagination
                color="primary"
                size="small"
                count={Math.ceil(project.length / MAX_PROJECTS_PER_PAGE)}
                page={page}
                onChange={handleChange}
              />
            </Box>
          }
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <TagListToolbar addTag={addTag}/>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {tag
                .map((tag) => (
                  <Grid
                    item
                    key={tag.id}
                    height="8vh"
                  >
                    <TagChip tag={tag}/>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;