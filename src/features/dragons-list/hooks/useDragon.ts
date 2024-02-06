import { useEffect, useState } from "react";

import { AxiosResponse } from "axios";

import { DragonStory } from "@/types";
import { deleteDragon, getDragonList } from "../api/";
import { Dragon, UseDragonReturn } from "../types";

export const useDragon = (): UseDragonReturn => {
  const [dragonList, setDragonList] = useState<Dragon[]>([]);
  const [toDeleteId, setToDeleteId] = useState<string>("");
  const [showingConfirmModal, setShowingConfirmModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const getDragons = () => {
    getDragonList()
      .then(({ data }: AxiosResponse<Dragon[]>) => {
        const alphabeticalOrderedList: Dragon[] = data.sort(
          (a: Dragon, b: Dragon) => (a.name > b.name ? 1 : -1)
        );

        setDragonList(alphabeticalOrderedList);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (id: string) => () => {
    setToDeleteId(id);
    setShowingConfirmModal(true);
  };

  const closeConfirmModal = () => setShowingConfirmModal(false);

  const updateListAfterDelete = () => {
    const toUpdateDragonsList: Dragon[] = [...dragonList];
    const toDeleteIndex: number = dragonList.findIndex(
      ({ id }: Dragon) => id === toDeleteId
    );

    toUpdateDragonsList.splice(toDeleteIndex, 1);

    setDragonList(toUpdateDragonsList);
  };

  const confirmDelete = () => {
    setIsDeleting(true);

    deleteDragon(toDeleteId)
      .then(() => {
        alert("Sucesso ao excluir o dragão!");
        updateListAfterDelete();
      })
      .catch(() => alert("Erro ao excluir o dragão!"))
      .finally(() => {
        setIsDeleting(false);
        setShowingConfirmModal(false);
      });
  };

  const parseStoriesList = (stories: DragonStory[]): string => {
    const hasValidStories: boolean =
      !!stories?.length &&
      stories.some(({ title, story }: DragonStory) => title && story);

    if (!hasValidStories) {
      return "";
    }

    return stories.reduce(
      (acc: string, { title, story }: DragonStory) =>
        acc + `${title}: ${story}`,
      ""
    );
  };

  useEffect(getDragons, []);

  return {
    dragonList,
    isLoading,
    isDeleting,
    showingConfirmModal,
    handleDelete,
    closeConfirmModal,
    confirmDelete,
    parseStoriesList,
  };
};
