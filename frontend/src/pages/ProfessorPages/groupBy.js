export function groupApplications(applications, students, proposals) {
  const combinedListTmp = applications.map((application) => {
    const student = students.find((s) => s.id === application.student_id);
    const proposal = proposals.find((p) => p.id === application.proposal_id);

    return {
      application_id: application.id,
      student_id: application.student_id,
      student_name: student ? `${student.name} ${student.surname}` : "Unknown",
      student_email: student ? student.email : "Unknown",
      student_degree: student ? student.degree : "Unknown",
      proposal_id: application.proposal_id,
      proposal_title: proposal ? proposal.title : "Unknown",
      proposal: proposal ? proposal : "Unknown",
      status_application_student: application.status,
    };
  });

  const groupedByProposal = combinedListTmp.reduce((acc, item) => {
    if (!acc[item.proposal_id]) {
      acc[item.proposal_id] = {
        proposal_id: item.proposal_id,
        proposal_title: item.proposal_title,
        proposal: item.proposal,
        applicants: [],
      };
    }

    acc[item.proposal_id].applicants.push({
      student_id: item.student_id,
      student_name: item.student_name,
      student_email: item.student_email,
      student_degree: item.student_degree,
      status_application_student: item.status_application_student,
    });

    return acc;
  }, {});

  const groupedByProposals = Object.values(groupedByProposal);

  const groupedByStudent = combinedListTmp.reduce((acc, item) => {
    if (!acc[item.student_id]) {
      acc[item.student_id] = {
        student_id: item.student_id,
        student_name: item.student_name,
        student_email: item.student_email,
        student_degree: item.student_degree,
        applications: [],
      };
    }

    acc[item.student_id].applications.push({
      proposal_id: item.proposal_id,
      proposal_title: item.proposal_title,
      proposal: item.proposal,
      status: item.status_application_student,
    });

    return acc;
  }, {});

  const groupedByStudents = Object.values(groupedByStudent);

  return { groupedByProposals, groupedByStudents };
}
